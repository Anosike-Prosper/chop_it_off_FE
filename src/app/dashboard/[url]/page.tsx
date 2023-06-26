"use client";
import react, { useEffect, useState } from "react";
import * as api from "@/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page({ params }: { params: { url: string } }) {
  const [url, seturl] = react.useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  react.useEffect(() => {
    if (url === null) {
      getUrl();
    }
  });

  async function getUrl() {
    try {
      const result = await api.getUrlInfo(params.url);
      console.log(result);
      seturl(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-max mx-auto mt-[2rem]">
      <div className="mt-4">
        <div className="mt-2 flex flex-col">
          <div className="mb-2">
            <span className="font-semibold text-sm">short url:</span>{" "}
            {url?.data?.shorturl}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-sm">original url:</span>{" "}
            {url?.data?.longurl}
          </div>
          <div className="mb-2">
            this url has been clicked {url?.data?.click} times
          </div>
        </div>
        {loading ? (
          <div>loading...</div>
        ) : (
          url?.reqInfo?.map((url: any) => {
            return (
              <div key={url.shorturl} className="mb-4 border px-3 py-2 bg-white border border-black rounded hover:shadow-outset">
                <div className="text-lg">{url.shorturl}</div>
                {/* <div>{url.longurl}</div> */}
                <div className="text-xs font-gray-400 mt-1">
                  <span>ip: </span> {url.ip}
                  <span>user agent: </span> {url.agent}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Page;
