import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { TravelLogWithId } from "@/models/TravelLog.model";
import { ScrollArea } from "./ui/scroll-area";

export function LastVisitedPlaces({ logs }: { logs: TravelLogWithId[] }) {
  return (
    <Card className="w-[350px] md:w-[400px] h-[300px] md:h-[375px]">
      <CardHeader className="pt-4 pb-0">
        <CardTitle>Ultimos lugares visitados</CardTitle>
      </CardHeader>
      <ScrollArea className="h-[300px] md:h-[375] p-4">
        {logs.length > 0 ? (
          <Accordion type="single" collapsible className=" w-full">
            {logs.map((log) => (
              <AccordionItem value={log.id} key={log.id}>
                <AccordionTrigger className="items-end hover:no-underline">
                  <div className="flex justify-between w-full pr-1 items-end">
                    <span className="hover:underline">{log.title}</span>
                    <span className="text-gray-500 text-sm">
                      {log.visitDate.toLocaleDateString()}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex rounded-full border p-1 max-w-screen-2xl divide-x gap-2">
                    <img
                      src={log.image}
                      alt={log.title}
                      className="rounded-full w-16 h-16 content-end object-cover"
                    />
                    <p className="truncate pl-2">{log.description}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-sm text-muted-foreground px-2">
            No has visitado ningún lugar aún…
          </p>
        )}
      </ScrollArea>
    </Card>
  );
}
