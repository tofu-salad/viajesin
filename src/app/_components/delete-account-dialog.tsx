"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui/alert-dialog";
import { Button, buttonVariants } from "@ui/button";
import { delete_account } from "../_actions/delete-account-action";

export function DeleteAccountDialog() {
  return (
    <form action={delete_account}>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Borrar Cuenta</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Estás absolumante seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Ésta accion no se puede deshacer. Vas a borrar permanentemente tu
              cuenta y los datos de los viajes de nuestros servidores.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => delete_account()}
              className={buttonVariants({ variant: "destructive" })}
            >
              BORRAR
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
}
