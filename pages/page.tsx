
import { supabase } from "@/lib/supabase";
import { Text } from "@chakra-ui/react";

type Country = {
  id: number;
  name: string;
};

type Props = {
  countries: Country[];
};

const Page = ({ countries }: Props) => {
  return (
    <>
    <Text>コンチには</Text>
    <ul>
      aa
      {countries.map((country) => (
        <li key={country.id}>{country.name}aa</li>
      ))}
    </ul>
    </>
  );
};

export const getStaticProps = async () => {
  let { data } = await supabase.from('countries').select();
  return {
    props: {
      countries: data,
    },
  };
};

export default Page;