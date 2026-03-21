import { Divider, Stack, Typography } from "@mui/material";

export default function PrivacyContent() {
  return (
    <Stack spacing={3} className="text-slate-700">
      <section id="overview">
        <Typography className="text-base font-bold text-slate-900">
          1) ภาพรวม
        </Typography>
        <Typography className="mt-1 text-sm leading-relaxed">
          นโยบายนี้อธิบายว่าเราเก็บ ใช้ เปิดเผย
          และปกป้องข้อมูลส่วนบุคคลของคุณอย่างไร
          เมื่อคุณใช้งานเว็บไซต์/แอปจองรถของเรา
        </Typography>
      </section>

      <section id="collect">
        <Typography className="text-base font-bold text-slate-900">
          2) ข้อมูลที่เราเก็บ
        </Typography>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>
            ข้อมูลบัญชี: ชื่อ อีเมล เบอร์โทร (ถ้ามี) และข้อมูลโปรไฟล์ที่คุณกรอก
          </li>
          <li>
            ข้อมูลการจอง: รายละเอียดรถ วันเวลา สถานที่รับ-คืน และสถานะการจอง
          </li>
          <li>
            ข้อมูลการชำระเงิน: อาจถูกประมวลผลโดยผู้ให้บริการชำระเงินภายนอก
            (เราอาจไม่เก็บเลขบัตรเต็ม)
          </li>
          <li>
            ข้อมูลการใช้งาน: IP, ประเภทอุปกรณ์, log การใช้งาน
            เพื่อความปลอดภัยและพัฒนาระบบ
          </li>
        </ul>
      </section>

      <section id="use">
        <Typography className="text-base font-bold text-slate-900">
          3) วัตถุประสงค์การใช้ข้อมูล
        </Typography>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>ให้บริการจองรถ ยืนยันตัวตน และจัดการบัญชี</li>
          <li>ติดต่อแจ้งสถานะการจอง การเปลี่ยนแปลง หรือการสนับสนุนลูกค้า</li>
          <li>
            ป้องกันการทุจริต/การเข้าถึงที่ไม่พึงประสงค์ และดูแลความปลอดภัยระบบ
          </li>
          <li>วิเคราะห์และพัฒนาประสบการณ์การใช้งาน (เชิงสถิติ)</li>
        </ul>
      </section>

      <section id="share">
        <Typography className="text-base font-bold text-slate-900">
          4) การเปิดเผยข้อมูล
        </Typography>
        <Typography className="mt-1 text-sm leading-relaxed">
          เราอาจเปิดเผยข้อมูลเท่าที่จำเป็นให้กับผู้ให้บริการที่เกี่ยวข้อง เช่น
          ผู้ให้บริการรถ ผู้ให้บริการชำระเงิน หรือผู้ให้บริการโครงสร้างพื้นฐาน
          โดยจะดำเนินการภายใต้สัญญาและมาตรการที่เหมาะสม
        </Typography>
      </section>

      <section id="cookies">
        <Typography className="text-base font-bold text-slate-900">
          5) คุกกี้และการติดตาม
        </Typography>
        <Typography className="mt-1 text-sm leading-relaxed">
          เราอาจใช้คุกกี้เพื่อการเข้าสู่ระบบ จดจำการตั้งค่า
          และวิเคราะห์การใช้งาน
          คุณสามารถจัดการคุกกี้ได้ผ่านการตั้งค่าเบราว์เซอร์
        </Typography>
      </section>

      <section id="security">
        <Typography className="text-base font-bold text-slate-900">
          6) ความปลอดภัย
        </Typography>
        <Typography className="mt-1 text-sm leading-relaxed">
          เราใช้มาตรการทางเทคนิคและการจัดการเพื่อปกป้องข้อมูล เช่น การเข้ารหัส
          การควบคุมสิทธิ์การเข้าถึง และการบันทึกเหตุการณ์ความปลอดภัย
        </Typography>
      </section>

      <section id="rights">
        <Typography className="text-base font-bold text-slate-900">
          7) สิทธิของเจ้าของข้อมูล
        </Typography>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
          <li>ขอเข้าถึง/ขอสำเนาข้อมูล</li>
          <li>ขอแก้ไขข้อมูลให้ถูกต้อง</li>
          <li>
            ขอลบหรือทำให้ไม่สามารถระบุตัวตนได้ (ตามเงื่อนไขที่กฎหมายกำหนด)
          </li>
          <li>ถอนความยินยอม (หากการประมวลผลอาศัยความยินยอม)</li>
        </ul>
      </section>

      <section id="retain">
        <Typography className="text-base font-bold text-slate-900">
          8) ระยะเวลาการเก็บรักษา
        </Typography>
        <Typography className="mt-1 text-sm leading-relaxed">
          เราจะเก็บข้อมูลเท่าที่จำเป็นต่อวัตถุประสงค์ของการให้บริการ
          หรือเท่าที่กฎหมายกำหนด หลังจากนั้นจะลบหรือทำให้ไม่สามารถระบุตัวตนได้
        </Typography>
      </section>

      <section id="contact">
        <Typography className="text-base font-bold text-slate-900">
          9) ติดต่อเรา
        </Typography>
        <Typography className="mt-1 text-sm leading-relaxed">
          หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว
          โปรดติดต่อผ่านหน้าช่วยเหลือหรืออีเมลของทีมงาน
          (ใส่อีเมล/เบอร์/ที่อยู่จริงของคุณตรงนี้)
        </Typography>
      </section>

      <Divider className="my-2! border-slate-200!" />

      <Typography className="text-xs text-slate-500">
        หมายเหตุ: เนื้อหานี้เป็นตัวอย่างเชิงทั่วไป ไม่ใช่คำแนะนำทางกฎหมาย
        หากใช้งานจริงในธุรกิจ แนะนำให้ให้ผู้เชี่ยวชาญตรวจทานให้สอดคล้องกับ PDPA
      </Typography>
    </Stack>
  );
}
