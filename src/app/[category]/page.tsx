"use client"

import { useParams } from "next/navigation";

const CategoryPage = async () => {
    const params = useParams();
    const { category } = await params;


    //  call api for this category
    return (
        <div>{category}</div>
    )
}

export default CategoryPage