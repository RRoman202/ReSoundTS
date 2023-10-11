import * as Tone from "tone";

interface baseUrlProps {
  url: string;
  filename: string;
}
let urlbase: string;
let filenamebase: string;
export let sampler: Tone.Sampler = new Tone.Sampler();
export const BaseUrl: React.FC<baseUrlProps> = ({ url, filename }) => {
  urlbase = { url }.url;
  filenamebase = { filename }.filename;
  console.log(urlbase);
  sampler = new Tone.Sampler({
    urls: {
      C4: filenamebase,
    },
    release: 1,
    baseUrl: urlbase,
  }).toDestination();
  return null;
};
