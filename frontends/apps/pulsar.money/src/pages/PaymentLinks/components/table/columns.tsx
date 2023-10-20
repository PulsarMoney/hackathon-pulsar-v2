import { usePaymentLinksMutations } from "@/hooks/payment-links/usePaymentLinksMutations";
import { PaymentLink, PaymentLinkStatus, PaymentLinkType } from "@/types/paymentLinks";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CheckIcon, ClockIcon, Cross1Icon, CrossCircledIcon, DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { PaymentStatus } from "@/pages/Invoices/PayInvoice/PaymentStatus";
export const paymentLinksColumns: ColumnDef<PaymentLink>[] = [
  {
    header: "Created At",
    accessorKey: "createdAt",
    cell: ({ row }) => <div>{new Date(row.getValue("createdAt")).toDateString()}</div>,
  },
  {
    header: "From",
    accessorKey: "from",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Status",
    id: "paymentStatus",
    cell: ({ row }) => {
      const paymentLink = row.original;
      if (paymentLink.paymentStatus === PaymentLinkStatus.FAILED) {
        return (
          <div className="flex gap-2 items-center">
            <CrossCircledIcon className="h-4 w-4 text-red-500" />
            <span className="text-gray-200 opacity-80">Failed</span>
          </div>
        );
      }
      if (paymentLink.paymentStatus === PaymentLinkStatus.CLAIMED_OR_PAID) {
        const text = paymentLink.type === PaymentLinkType.SEND ? "Claimed" : "Paid";
        return (
          <div className="flex gap-2 items-center">
            <CheckIcon className="h-4 w-4 text-green-500" />
            <span className="text-gray-200 opacity-80">{text}</span>
          </div>
        );
      }
      if (paymentLink.paymentStatus === PaymentLinkStatus.EXPIRED) {
        return (
          <div className="flex gap-2 items-center">
            <CrossCircledIcon className="h-4 w-4 text-red-500" />
            <span className="text-gray-200 opacity-80">Expired</span>
          </div>
        );
      }
      if (paymentLink.paymentStatus === PaymentLinkStatus.NOT_PAID_OR_CLAIMED) {
        const text = paymentLink.type === PaymentLinkType.SEND ? "Can Claim" : "Can Pay";
        return (
          <div className="flex gap-2 items-center">
            <ClockIcon className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-200 opacity-80">{text}</span>
          </div>
        );
      }
      if (paymentLink.paymentStatus === PaymentLinkStatus.NOT_CREATED) {
        return (
          <div className="flex gap-2 items-center">
            <ClockIcon className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-200 opacity-80">Creating...</span>
          </div>
        );
      }
      if (paymentLink.paymentStatus === PaymentLinkStatus.WITHDRAWN) {
        return (
          <div className="flex gap-2 items-center">
            <Cross1Icon className="h-4 w-4 text-yellow-500" />
            <span className="text-gray-200 opacity-80">Canceled</span>
          </div>
        );
      }
      console.log(paymentLink.paymentStatus);
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const { deletePaymentLink } = usePaymentLinksMutations();
      const onDelete = async (e: any) => {
        e.stopPropagation();
        await deletePaymentLink.mutateAsync(row.original.paymentLinkId);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-red-500" onClick={onDelete}>
              <TrashIcon className="h-4 w-4 mr-2 text-red-500" />
              Delete{" "}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
