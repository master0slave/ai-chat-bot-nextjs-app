import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(req: NextRequest, {params}:{params:Promise<{id:string}>}) {
    try {
        const supabase = await createClient();
        const userId = (await params).id;

        const { data } = await supabase.from('staff').select().eq('user_id', userId).single();

        if (!data) {
            return NextResponse.json({message: "ไม่พบบัญชีผู้ใช้"}, {status: 404})
        }
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(error, {status: 500});
    }
}