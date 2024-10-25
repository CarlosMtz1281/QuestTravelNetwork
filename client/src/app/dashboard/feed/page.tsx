import React from "react";
import Post from "./components/post";

export default function Feed() {
	return (
		<div>
			<h1
				className="text-3xl font-semibold   
            text-gray-800 tracjing-tight mb-4"
			>
				Feed
			</h1>

			<div className="flex flex-wrap h-full w-full gap-4 items-center justify-around">
				<Post
					imageUrl=""
					location="Swiss Alps, Switzerland"
					title="Serene Mountain Getaway"
					description="Discover the breathtaking beauty of the Swiss Alps with its crystal-clear lakes and majestic peaks."
					likes={0}
					comments={[
						{
							id: 1,
							userName: "Mountain Lover",
							userAvatar: "/placeholder.svg?height=32&width=32",
							content:
								"This view is absolutely stunning! I can't wait to visit.",
							timestamp: "2 hours ago",
						},
						{
							id: 2,
							userName: "Adventure Seeker",
							userAvatar: "/placeholder.svg?height=32&width=32",
							content:
								"The Swiss Alps are on my bucket list. Any recommendations for hiking trails?",
							timestamp: "1 day ago",
						},
					]}
					userName="Alex Traveler"
					userAvatar="/placeholder.svg?height=40&width=40"
				/>
			</div>
		</div>
	);
}
