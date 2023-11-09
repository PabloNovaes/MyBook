import sharp from "sharp";

export async function webpConversion(data) {
  const imageType = data.split(",")[0];
  if (
    imageType == "data:image/webp;base64" ||
    imageType == "data:image/png;base64" ||
    imageType == "data:image/svg+xml;base64"
  )
    return data;

  const base64Data = data.replace(/^data:image\/jpeg;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  const webpBuffer = await sharp(buffer)
    .toFormat("webp")
    .webp({ quality: 20 })
    .toBuffer();
  const dataUrl = `data:image/webp;base64,${webpBuffer.toString("base64")}`;

  return dataUrl;
}
