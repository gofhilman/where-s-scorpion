import { use } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { format } from "date-fns";
import padTime from "~/lib/padTime";

export default function Leaderboard({ leaderboardPromise }: any) {
  const { leaderboard }: any = use(leaderboardPromise);
  return (
    <div>
      {leaderboard.length === 0 ? (
        <p>
          <i>No players yet</i>
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right">Rank</TableHead>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[100px]">Duration</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((record: any, index: any) => (
              <TableRow key={record.id}>
                <TableCell className="text-right">{index + 1}</TableCell>
                <TableCell>{record.playerName}</TableCell>
                <TableCell>
                  {(({ minutes, seconds, centiseconds }) =>
                    `${minutes} : ${seconds} : ${centiseconds}`)(
                    padTime(record.duration / 10),
                  )}
                </TableCell>
                <TableCell>{format(record.finishedAt, "MMMM d, y")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
