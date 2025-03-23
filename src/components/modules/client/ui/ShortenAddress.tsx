import { shortenAddress } from "../hooks/useShortenAddress.hook";

import React from 'react'

export default function ShortenAddress() {
  return (
<span>{shortenAddress(walletAddress)}</span>;  )
}

