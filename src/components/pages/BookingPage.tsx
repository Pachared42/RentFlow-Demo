"use client";

import { Box, Card, CardContent, Container, Divider, Typography } from "@mui/material";
import BookingPageSkeleton from "@/src/components/booking/BookingPageSkeleton";
import BookingSummaryCard from "@/src/components/booking/BookingSummaryCard";
import BookingForm from "@/src/components/booking/BookingForm";
import useBooking from "@/src/hooks/booking/useBooking";

export default function BookingPage() {
  const booking = useBooking();

  if (!booking.ready) {
    return <BookingPageSkeleton />;
  }

  return (
    <Container maxWidth="lg" className="py-12">
      <Box className="flex flex-col gap-2">
        <Typography variant="h5" className="text-2xl font-bold text-slate-900">
          จองรถ
        </Typography>
        <Typography className="text-sm text-slate-600">
          เลือกจุดรับ-คืนรถ + วันเวลา แล้วไปชำระเงิน
        </Typography>

        {booking.car?.shopName ? (
          <Typography className="text-xs text-slate-500">
            ร้านผู้ให้บริการ:{" "}
            <span className="font-semibold text-slate-900">
              {booking.car.shopName}
            </span>
          </Typography>
        ) : null}

        <Typography className="text-xs text-slate-500">
          โหมดจุดรับ-คืนรถ:{" "}
          <span className="font-semibold text-slate-900">
            {booking.merchantBranchesEnabled
              ? "มีสาขาให้บริการ"
              : "รับ-คืนตามสถานที่ที่ระบุ"}
          </span>
        </Typography>
      </Box>

      <Box className="mt-6 grid gap-6 lg:grid-cols-12">
        <BookingSummaryCard
          car={booking.car}
          carId={booking.carId}
          finalPickupPoint={booking.finalPickupPoint}
          pickupDate={booking.pickupDate}
          pickupTime={booking.pickupTime}
          finalReturnPoint={booking.finalReturnPoint}
          returnDate={booking.returnDate}
          returnTime={booking.returnTime}
          days={booking.days}
          addonsTotal={booking.addonsTotal}
          pricing={booking.pricing}
          amount={booking.amount}
        />

        <Card
          elevation={0}
          sx={{ boxShadow: "none" }}
          className="lg:col-span-7 rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-4!">
            <Typography className="text-sm font-semibold text-slate-900">
              ข้อมูลการจอง
            </Typography>
            <Typography className="mt-1 text-xs text-slate-500">
              เลือกจุดรับ-คืนรถ วันเวลา และกรอกข้อมูลผู้จอง
            </Typography>

            <Divider className="my-5! border-slate-200!" />

            <BookingForm
              fieldSX={booking.fieldSX}
              error={booking.error}
              setError={booking.setError}
              onSubmit={booking.onSubmit}
              fullName={booking.fullName}
              setFullName={booking.setFullName}
              email={booking.email}
              setEmail={booking.setEmail}
              phone={booking.phone}
              setPhone={booking.setPhone}
              merchantBranchesEnabled={booking.merchantBranchesEnabled}
              branchOptions={booking.branchOptions}
              pickupBranch={booking.pickupBranch}
              setPickupBranch={booking.setPickupBranch}
              returnBranch={booking.returnBranch}
              setReturnBranch={booking.setReturnBranch}
              pickupOther={booking.pickupOther}
              setPickupOther={booking.setPickupOther}
              returnOther={booking.returnOther}
              setReturnOther={booking.setReturnOther}
              pickupFreeText={booking.pickupFreeText}
              setPickupFreeText={booking.setPickupFreeText}
              returnFreeText={booking.returnFreeText}
              setReturnFreeText={booking.setReturnFreeText}
              pickupDate={booking.pickupDate}
              setPickupDate={booking.setPickupDate}
              pickupTime={booking.pickupTime}
              setPickupTime={booking.setPickupTime}
              returnDate={booking.returnDate}
              setReturnDate={booking.setReturnDate}
              returnTime={booking.returnTime}
              setReturnTime={booking.setReturnTime}
              addons={booking.addons}
              addonsTotal={booking.addonsTotal}
              handleAddonChange={booking.handleAddonChange}
              startDT={booking.startDT}
              endDT={booking.endDT}
              timeInvalid={booking.timeInvalid}
              showChatBooking={booking.showChatBooking}
              chatHref={booking.chatHref}
              canSubmit={booking.canSubmit}
              loading={booking.loading}
              carExists={!!booking.car}
            />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
