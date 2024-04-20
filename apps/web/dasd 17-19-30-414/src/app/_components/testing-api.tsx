"use client"
import { api } from "@/src/trpc/react";

export const TestingApi = () => {
  const { data: testData } = api.test.useQuery({ id: "" });

  return <div>api: {testData?.msg}</div>;
};
