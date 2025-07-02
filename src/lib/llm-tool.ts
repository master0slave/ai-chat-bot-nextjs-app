import { tool } from "@langchain/core/tools";
import { z } from "zod";

const getUserDataSchema = z.object({
    userId: z.string().describe("รหัสพนักงาน")
});

const getUserDataTool = tool(
    async ({ userId }): Promise<string> => {
        return `${userId} เงินเดือน 25000 บาท วันลาคงเหลือ 7 วัน`;
    },
    {
        name: "getUserData",
        description: "สำหรับเรียกดูข้อมูลของพนักงานตามรหัสพนักงาน และคืนค่าข้อมูลได้แก่ เงินเดือน วันลาคงเหลือ",
        schema: getUserDataSchema
    }
);

export { getUserDataTool };