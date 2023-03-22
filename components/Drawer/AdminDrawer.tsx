import { supabase } from "@/lib/supabase";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

export type AdminDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AdminDrawer: React.FC<AdminDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const toast = useToast();

  const handlePostCreate = useCallback(async () => {
    const { data, error } = await supabase.from("posts").insert({}).select();
    if (error) {
      toast({
        title: "通信エラー",
        status: "error",
      });
    }
    if (data) {
      const id = data.at(0)?.id;
      router.push(`/posts/${id}/edit`);
    }
  }, [router, toast]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>メニュー</DrawerHeader>
        <DrawerBody>
          <Button as="a" onClick={handlePostCreate}>
            記事作成
          </Button>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
