"use client";
import react from "react";
import * as Yup from "yup";
import * as api from "@/api";
import { toast } from "react-hot-toast";
import createForm from "@/components/form";
import { AuthContextType, useAuthContext } from "@/contexts/auth.context";
import Image from "next/image"
import { useRouter } from "next/navigation";
const validationSchema = Yup.object({
  longurl: Yup.string().required(),
  customId: Yup.string(),
});

function Page() {
  const router = useRouter();
  const Form = createForm<
    { longurl: string; customId: string },
    typeof validationSchema
  >({
    initialValues: {
      longurl: "",
      customId: "",
    },
    validationSchema,
  });

  const submitForm = async (values: { longurl: string; customId: string }) => {
    try {
      const data = await api.geturl(values);
      seturl(data.data);
      toast.success("you have been successfully onboarded.");
      getAllUrls();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      return;
    }
  };

  const genQr = async (values: { longurl: string; customId: string }) => {
    try {
      const data = await api.createqr(values);
      seturl(data.data);
      getAllUrls();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
      return;
    }
  };
  const [urls, seturls] = react.useState<any[] | null>(null);
  const [url, seturl] = react.useState<any | null>(null);

  react.useEffect(() => {
    if (urls === null) {
      getAllUrls();
    }
  });

  async function getAllUrls() {
    const result = await api.geturls();
    seturls(result.data);
  }
  return (
    <div className="h-max mx-auto mt-[2rem]">
      <div className="flex flex-col items-center">
        {url && typeof url !== "string" && (
          <div>
            <div className="mb-5 px-8 py-6 border rounded border-black">
              <div className="text-xs mb-1">Copy your short link </div>
              <div className="font-bold">{url?.shorturl}</div>
            </div>
          </div>
        )}
        {url && typeof url == "string" && (
          <div className="mb-5 px-8 py-6 border rounded border-black">
            <div className="text-center">
              <Image src={url} alt="Qr code." />
              <a href={url} className="hover:underline font-semibold" download={"QRCode."}>
                download
              </a>
            </div>
          </div>
        )}
      </div>
      <Form>
        <div className="space-y-[18px]">
          <div className="flex flex-col space-y-3">
            <Form.Input
              placeholder="enter a longurl"
              name="longurl"
              type="url"
            />
            <Form.Input
              placeholder="enter a customId(optional)"
              name="customId"
            />
          </div>

          <div className="flex space-x-3">
            <Form.Submit onClick={submitForm} text="Generate short url!" />
            <Form.Submit onClick={genQr} text="Generate qrcode!" />
          </div>
        </div>
      </Form>

      <div className="w-full flex">
        <div className="mx-auto w-20 my-16 border-t border-2 border-black"></div>
      </div>

      <div className="text-xl font-semibold mb-3">Your Created Short Links</div>
      <div className="">
        {urls?.reverse().map((url) => {
          return (
            <div key={url._id} className="mb-4 border px-3 py-2 bg-white border border-black rounded hover:shadow-outset">
              <a href={`/dashboard/${url._id}`}>
                <div className="text-lg">{url.shorturl}</div>
                {/* <div>{url.longurl}</div> */}
                <div className="text-xs font-gray-400 mt-1">
                  click to view url info details
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
