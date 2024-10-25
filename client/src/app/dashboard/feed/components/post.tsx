/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Comment {
	id: number;
	userName: string;
	userAvatar: string;
	content: string;
	timestamp: string;
}

interface PostProps {
	id: string;
	category: string;
	location: string;
	description: string;
	userKey: string;
	link: string;
	comments: Comment[];
	likes: number;
	date: string;
}

export default function Post({
	category,
	location,
	description,
	userKey,
	link,
	comments,
}: PostProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [allComments, setAllComments] = useState(comments);

	const handleAddComment = () => {
		if (newComment.trim()) {
			const comment: Comment = {
				id: allComments.length + 1,
				userName: "Current User",
				userAvatar: "/placeholder.svg?height=32&width=32",
				content: newComment.trim(),
				timestamp: "Just now",
			};
			setAllComments([...allComments, comment]);
			setNewComment("");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Card className="max-w-xs w-full mx-auto h-min cursor-pointer hover:shadow-lg transition-shadow duration-300">
					<CardHeader className="p-0">
						<div className="relative h-24 w-full overflow-hidden rounded-t-lg">
							<img
								src={link}
								alt={description}
								className="absolute inset-0 h-full w-full object-cover"
							/>
							<div className="absolute bottom-2 left-2 bg-white/80 px-2 py-1 rounded-full text-sm font-medium">
								{location}
							</div>
						</div>
					</CardHeader>
					<CardContent className="p-4">
						<h3 className="text-lg font-semibold mb-2">{category}</h3>
						<p className="text-sm text-gray-600 line-clamp-2">{description}</p>
					</CardContent>
					<CardFooter className="flex items-center justify-between p-4 pt-0">
						<div className="flex items-center space-x-2">
							<Avatar>
								<AvatarImage
									src="/placeholder.svg?height=32&width=32"
									alt="User Avatar"
								/>
								<AvatarFallback>{userKey.charAt(0)}</AvatarFallback>
							</Avatar>
							<span className="text-sm font-medium">{userKey}</span>
						</div>
					</CardFooter>
				</Card>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[900px]">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col">
						<div className="relative h-64 md:h-80 w-full overflow-hidden rounded-lg">
							<img
								src={link}
								alt={description}
								className="absolute inset-0 h-full w-full object-cover"
							/>
						</div>
						<div className="mt-4">
							<DialogHeader>
								<DialogTitle className="text-2xl">{category}</DialogTitle>
								<DialogDescription>{location}</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<p className="text-sm text-gray-600">{description}</p>
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-2">
									<Avatar>
										<AvatarImage
											src="/placeholder.svg?height=32&width=32"
											alt="User Avatar"
										/>
										<AvatarFallback>{userKey.charAt(0)}</AvatarFallback>
									</Avatar>
									<span className="text-sm font-medium">{userKey}</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									className="flex items-center space-x-1"
								>
									<MessageCircle className="h-4 w-4" />
									<span>{allComments.length}</span>
								</Button>
							</div>
						</div>
					</div>
					<div className="flex flex-col h-full">
						<h4 className="text-lg font-semibold mb-4">Comments</h4>
						<ScrollArea className="flex-grow">
							{allComments.map((comment) => (
								<div key={comment.id} className="mb-4">
									<div className="flex items-center space-x-2 mb-1">
										<Avatar className="w-6 h-6">
											<AvatarImage
												src={comment.userAvatar}
												alt={comment.userName}
											/>
											<AvatarFallback>
												{comment.userName.charAt(0)}
											</AvatarFallback>
										</Avatar>
										<span className="text-sm font-medium">
											{comment.userName}
										</span>
										<span className="text-xs text-gray-500">
											{comment.timestamp}
										</span>
									</div>
									<p className="text-sm text-gray-600 pl-8">
										{comment.content}
									</p>
								</div>
							))}
						</ScrollArea>
						<div className="mt-4 flex items-center space-x-2">
							<Input
								placeholder="Add a comment..."
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								onKeyPress={(e) => {
									if (e.key === "Enter") {
										handleAddComment();
									}
								}}
							/>
							<Button size="icon" onClick={handleAddComment}>
								<Send className="h-4 w-4" />
								<span className="sr-only">Send comment</span>
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
