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
        <p className="text-center">
          <i>No players yet</i>
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboard.map((record: any, index: any) => (
              <TableRow key={record.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{record.playerName}</TableCell>
                <TableCell>
                  {(({ minutes, seconds, centiseconds }) =>
                    `${minutes} : ${seconds} : ${centiseconds}`)(
                    padTime(record.duration / 10),
                  )}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {format(record.finishedAt, "MMMM d, y")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
