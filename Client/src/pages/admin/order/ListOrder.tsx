import Heading from "@/components/typography/Heading";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { IconPlus } from "@/components/icons";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/types";
import Title from "@/components/typography/Title";
import { OrderContext, OrderContextType } from "@/contexts/OrderContext";

const ListOrder = () => {
  const { state } = useContext(OrderContext) as OrderContextType;
  const [data, setData] = useState<IOrder[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    setData(state.orders);
  }, [state.orders]);

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Tên khách hàng",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },

    {
      accessorKey: "total",
      header: "Tổng tiền",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("total")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Trạng thái thanh toán",
      cell: ({ row }) => (
        <div>
          {row.getValue("status") ? (
            <button
              type="button"
              className="bg-green-500 text-green-500 p-2 bg-opacity-10 border whitespace-nowrap border-current rounded-md font-semibold px-3 py-1 text-sm"
            >
              Đã thanh toán
            </button>
          ) : (
            <button
              type="button"
              className="bg-red-500 text-red-500 p-2 bg-opacity-10 border whitespace-nowrap border-current rounded-md font-semibold px-3 py-1 text-sm"
            >
              Chưa thanh toán
            </button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "delivery",
      header: "Trạng thái vận chuyển",
      cell: ({ row }) => {
        const deliveryStatus = row.getValue<string>("delivery");
        let buttonClass =
          "p-2 bg-opacity-10 border whitespace-nowrap border-current rounded-md font-semibold px-3 py-1 text-sm";
        let statusText = "Không xác định";
        switch (deliveryStatus) {
          case "PROCESSING":
            buttonClass += " bg-yellow-500 text-yellow-500";
            statusText = "Đang xử lý";
            break;
          case "DELIVERING":
            buttonClass += " bg-blue-500 text-blue-500";
            statusText = "Đang giao hàng";
            break;
          case "SUCCESS_DELIVERY":
            buttonClass += " bg-green-500 text-green-500";
            statusText = "Giao hàng thành công";
            break;
          case "CANCELLED":
            buttonClass += " bg-red-500 text-red-500";
            statusText = "Đã hủy";
            break;
          default:
            buttonClass += " bg-gray-500 text-gray-500";
        }
        return (
          <div>
            <button type="button" className={buttonClass}>
              {statusText}
            </button>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Ngày đặt hàng",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        const formattedDate = new Intl.DateTimeFormat("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Ngày cập nhật",
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"));
        const formattedDate = new Intl.DateTimeFormat("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date);
        return <div>{formattedDate}</div>;
      },
    },
    {
      header: "Hành động",
      cell: ({ row }) => (
        <div className="flex gap-4 items-center">
          <Link to={`/admin/orders/${row.original._id ?? ""}`}>
            <Button className="text-white">Chi tiết</Button>
          </Link>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <Heading>Quản lý đơn hàng</Heading>
      <Title className="mt-4">Danh sách đơn hàng trên hệ thống</Title>
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <Input
            placeholder="Tìm kiếm ..."
            value={(table.getColumn("_id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("_id")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table className="dark:bg-grayDarkest">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : ""}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Không có kết quả.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4 mb-16">
          <div className="flex-1 text-sm text-muted-foreground">
            Tổng cộng {table.getRowModel().rows.length} được hiển thị /
            {table.getFilteredRowModel().rows.length} bản ghi trên trang này
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Trang trước
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Trang tiếp
            </Button>
          </div>
        </div>
        {showFloatingButton &&
          table.getFilteredRowModel().rows.length >= 10 && (
            <div className="fixed bottom-0 right-5 rounded-lg text-primary animate-bounce">
              <Link to={"/admin/orders/create"}>
                <IconPlus className="mb-2" />
              </Link>
            </div>
          )}
      </div>
    </div>
  );
};

export default ListOrder;
