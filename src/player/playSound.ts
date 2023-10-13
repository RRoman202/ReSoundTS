import * as Tone from "tone";

interface baseUrlProps {
  url: string;
  filename: string;
}
interface volumeProps {
  volume: number;
}
export let sampler: Tone.Sampler = new Tone.Sampler();
function newsampler(newurl: string, newfile: string) {
  sampler = new Tone.Sampler({
    urls: {
      C4: newfile,
    },
    release: 1,
    baseUrl: newurl,
  }).toDestination();
}
function newsamplervolume(volume: number) {
  sampler.volume.value = volume;
}
export const BaseUrl: React.FC<baseUrlProps> = ({ url, filename }) => {
  const urlbase = { url }.url;
  const filenamebase = { filename }.filename;

  console.log(urlbase);
  newsampler(urlbase, filenamebase);

  return null;
};
export const VolumeValue: React.FC<volumeProps> = ({ volume }) => {
  newsamplervolume({ volume }.volume);
  return null;
};
