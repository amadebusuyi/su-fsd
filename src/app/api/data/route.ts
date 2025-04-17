import path from "path";
import fs from "fs";
import Papa from "papaparse";
import sortItemsByNormalizedName from "@/app/utils/sortItemByNormalizedName";
import { NextResponse } from "next/server";

type FileData = {
    createdAt: string;
    name: string;
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const csvPath = path.join(process.cwd(), 'public/data.csv');
    const csvFile = fs.readFileSync(csvPath, 'utf8');

    const parsed = Papa.parse<FileData>(csvFile, {
        header: false,
        skipEmptyLines: true,
    });

    const data: FileData[] = parsed.data.map((row: any) => {
    return {
        createdAt: row[0],
        name: row[1],
        };
    });
    let responseData = data;
    const sort = searchParams.get("sort");
    if (sort) {
        const sortType = sort.indexOf("created") > -1 ? "created" : "name"
        const sortOrder = sort.indexOf("desc") > -1 ? "desc" : "asc";
        responseData = sortType === "name" ? sortItemsByNormalizedName(data, sortOrder) : data.sort((a, b) => {
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
    }
    return NextResponse.json({ message: 'Result fetched', data: responseData });
}