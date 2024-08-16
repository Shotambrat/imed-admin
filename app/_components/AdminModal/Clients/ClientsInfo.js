"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ClientsTitle from "@/app/_components/AdminModal/Clients/ClientsTitle"
import Gallery from "./Gallery";


export default function PartnersInfo({
  setCreatedList,
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
}) {



    return (
        <div>
            <ClientsTitle />
            <Gallery />
        </div>
    )
}