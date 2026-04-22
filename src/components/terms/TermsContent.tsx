import { Divider, Stack, Typography } from "@mui/material";

export default function TermsContent() {
  return (
    <Stack spacing={5} className="text-[var(--rf-apple-muted)]">
      <section id="intro" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          1) ข้อตกลงเบื้องต้น
        </Typography>
        <Typography className="mt-2 text-sm leading-7">
          การใช้งานเว็บไซต์/แอปนี้หมายความว่าคุณยอมรับเงื่อนไขการใช้งานทั้งหมด
          หากคุณไม่เห็นด้วย โปรดหยุดใช้งานบริการ
        </Typography>
      </section>

      <section id="account" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          2) บัญชีผู้ใช้
        </Typography>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
          <li>คุณต้องให้ข้อมูลที่ถูกต้องและเป็นปัจจุบันในการสมัครสมาชิก</li>
          <li>คุณรับผิดชอบต่อความปลอดภัยของบัญชีและรหัสผ่านของคุณ</li>
          <li>หากสงสัยว่าบัญชีถูกใช้งานโดยไม่ได้รับอนุญาต โปรดติดต่อเรา</li>
        </ul>
      </section>

      <section id="booking" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          3) การจองและการชำระเงิน
        </Typography>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
          <li>รายละเอียดรถ ราคา และช่วงเวลาที่แสดง อาจเปลี่ยนแปลงตามเงื่อนไขผู้ให้บริการ</li>
          <li>การยืนยันการจองอาจขึ้นอยู่กับการตรวจสอบความพร้อมของรถ</li>
          <li>กรณีมีการชำระเงิน ระบบอาจใช้ผู้ให้บริการชำระเงินภายนอก</li>
        </ul>
      </section>

      <section id="cancel" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          4) การยกเลิก / คืนเงิน
        </Typography>
        <Typography className="mt-2 text-sm leading-7">
          เงื่อนไขการยกเลิกและคืนเงินขึ้นกับนโยบายของผู้ให้บริการรถและช่องทางชำระเงิน
          โปรดตรวจสอบรายละเอียดก่อนยืนยันการจอง
        </Typography>
      </section>

      <section id="use" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          5) การใช้งานที่เหมาะสม
        </Typography>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7">
          <li>ห้ามใช้บริการในทางที่ผิดกฎหมาย หรือละเมิดสิทธิผู้อื่น</li>
          <li>ห้ามพยายามเจาะระบบ รบกวนระบบ หรือดึงข้อมูลโดยไม่ได้รับอนุญาต</li>
          <li>เราสามารถระงับ/ยุติการให้บริการ หากตรวจพบการใช้งานที่ผิดเงื่อนไข</li>
        </ul>
      </section>

      <section id="liability" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          6) ข้อจำกัดความรับผิด
        </Typography>
        <Typography className="mt-2 text-sm leading-7">
          บริการนี้จัดให้ “ตามสภาพ” เราไม่รับประกันว่าจะไม่มีข้อผิดพลาดหรือหยุดชะงัก
          และไม่รับผิดชอบความเสียหายทางอ้อมที่อาจเกิดขึ้นจากการใช้งาน
        </Typography>
      </section>

      <section id="changes" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          7) การเปลี่ยนแปลงเงื่อนไข
        </Typography>
        <Typography className="mt-2 text-sm leading-7">
          เราอาจปรับปรุงเงื่อนไขเป็นครั้งคราว โดยจะแสดง “วันที่อัปเดตล่าสุด” ไว้ด้านบน
          การใช้งานต่อหลังมีการเปลี่ยนแปลงถือว่าคุณยอมรับเงื่อนไขใหม่
        </Typography>
      </section>

      <section id="contact" className="scroll-mt-28">
        <Typography className="text-base font-bold tracking-[-0.03em] text-[var(--rf-apple-ink)]">
          8) ติดต่อเรา
        </Typography>
        <Typography className="mt-2 text-sm leading-7">
          หากมีคำถามเกี่ยวกับเงื่อนไขการใช้งาน โปรดติดต่อผ่านหน้าช่วยเหลือ
        </Typography>
      </section>

      <Divider className="my-1! border-black/10!" />

      <Typography className="text-xs text-[var(--rf-apple-muted)]">
        RentFlow อาจปรับปรุงเงื่อนไขการใช้งานตามความเหมาะสม
      </Typography>
    </Stack>
  );
}
