import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface HackCardProps {
    token: string;
    name: string;
    avatar: string;
    banner: string;
    targetAmount: number;
    raisedAmount: number;
    endDate: Date;
    category: string;
}
export default function HackCard({ token, name, targetAmount, raisedAmount, endDate, category }: HackCardProps) {
    const timeRemaining = () => {
        const now = new Date().getTime()
        const endTime = new Date(endDate).getTime()
        const timeDiff = endTime - now

        if (timeDiff <= 0) {
            return { value: 0, unit: "ended", display: "Funding ended" }
        }

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) {
            return { value: days, unit: days === 1 ? "day" : "days", display: `${days} ${days === 1 ? "day" : "days"} left` }
        } else if (hours > 0) {
            return {
                value: hours,
                unit: hours === 1 ? "hour" : "hours",
                display: `${hours} ${hours === 1 ? "hour" : "hours"} left`,
            }
        } else {
            return {
                value: minutes,
                unit: minutes === 1 ? "minute" : "minutes",
                display: `${minutes} ${minutes === 1 ? "minute" : "minutes"} left`,
            }
        }
    }
    const timeLeft = timeRemaining();

    const fundingProgress = (raisedAmount / targetAmount) * 100;

    return (
        <Link
            href={`/${token}`}
            className="block w-full max-w-md transition-all duration-200 hover:shadow-lg hover:scale-[1.01] rounded-xl overflow-hidden"
        >
            <Card className="w-full max-w-md">
                {/* Banner Image */}
                <div className="relative h-48 bg-gradient-to-r from-blue-500 to-green-500">
                    <Image
                        src="/placeholder.svg"
                        alt="Hack banner"
                        className="object-cover"
                        fill
                    />
                    {/* Profile Picture Overlay */}
                    <div className="absolute -bottom-8 right-6">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="/placeholder.svg" alt="Hack avatar" className="object-cover"/>
                            <AvatarFallback className="text-2xl font-semibold">
                                {name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-800">
                            {category}
                        </Badge>
                    </div>
                </div>

                <CardContent className="pt-18 p-4">
                    {/* Project Title */}
                    <h3 className="font-semibold text-2xl leading-tight mb-2">{name}</h3>

                    {/* End Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <span className={cn(
                            "font-bold",
                            timeLeft.unit === "ended" ? "text-red-500" : ""
                        )}>{timeLeft.display}</span>
                        <span className="text-xs">{endDate.toDateString()}</span>
                    </div>

                    {/* Funding Progress */}
                    <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center">
                            <span className="text-green-400">{raisedAmount.toLocaleString()} ETH raised</span>
                            <span className="text-sm text-muted-foreground">of {targetAmount.toLocaleString()} ETH</span>
                        </div>
                        <Progress value={fundingProgress} className="h-2" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}