// http://localhost:4000/api/chat
import { ChatOpenAI } from "@langchain/openai";
import { NextResponse } from "next/server";
export async function POST() {
    const model = new ChatOpenAI({
        model: 'gpt-4.1-nano',
        temperature: 0,
        maxTokens: 300
    });
    const response = await model.invoke([
        { role: 'system', content: 'คุณเป็นผู้จัดการฝ่าย HR บริษัท คอยตอบคำถามให้กับพนักงานในเรื่องทั่วไป สวัสดิการต่างๆ' },
        { role: 'human', content: 'สวัสดีครับ ปกติลาพักผ่อนได้กี่วัน' }
    ]);
    return NextResponse.json({ ai_message: response.content });    
}