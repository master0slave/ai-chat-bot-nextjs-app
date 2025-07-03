import { tool } from "@langchain/core/tools";
import { z } from "zod";

const getUserDataSchema = z.object({
    userId: z.string().describe("รหัสพนักงาน")
});

const getUserDataTool = tool(
    async ({ userId }, options): Promise<string> => {
        const currentUserId = options?.metadata?.currentUserId as string;
        
        const res = await fetch('http://localhost:4000/api/user/' + userId);
        if (res.status === 404) {
            return JSON.stringify({ error: "NOT FOUND" });
        }
        const data = await res.json();

        // เช็คสิทธิ์ อนุญาตให้เข้าถึงเฉพาะข้อมูลตัวเองเท่านั้น
        const isOwnData = userId === currentUserId;
        if (!isOwnData) {
            return JSON.stringify({ error: "FORBIDDEN" });
        }

        return JSON.stringify(data);
    },
    {
        name: "getUserData",
        description: "สำหรับเรียกดูข้อมูลส่วนตัวของพนักงานตามรหัสพนักงาน จะคืนค่าข้อมูลได้แก่ ชื่อ-สกุล เงินเดือน วันลาคงเหลือ วันที่เริ่มทำงาน และอื่นๆ",
        schema: getUserDataSchema
    }
);

export { getUserDataTool };