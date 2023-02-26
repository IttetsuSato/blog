// import { supabase } from 'src/lib/supabaseClient';

import { supabase } from "@/lib/supabase";

type Country = {
  id: number;
  name: string;
};

type Props = {
  countries: Country[];
};

const Page = ({ countries }: Props) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.id}>{country.name}</li>
      ))}
    </ul>
  );
};

export const getServerSideProps = async () => {
  let { data } = await supabase.from('countries').select();
  return {
    props: {
      countries: data,
    },
  };
};

export default Page;