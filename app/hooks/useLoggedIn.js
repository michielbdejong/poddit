'use client'

import { useState } from 'react';

import { getDefaultSession } from "@inrupt/solid-client-authn-browser";

export default function useWebId() {
  return useState(getDefaultSession().info.isLoggedIn);
}
