"use client"
import Map from "@/components/map";
import { Tile } from '@/game/types';
import { defaultMap } from '@/data/mapData';
import { useState } from 'react';

export default function Home() {
  const [mapData] = useState(defaultMap);

  return (
    <div>
      <Map mapData={mapData as Tile[][]} />
    </div>
  );
}
