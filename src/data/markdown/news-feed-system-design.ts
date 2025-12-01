export const NEWS_FEED_SYSTEM_DESIGN_MD = `
# Design a News Feed System

Designing a news feed (like Facebook News Feed, Instagram Feed, or Twitter Timeline) is a classic system design challenge. It tests your ability to handle scale, data modeling, and latency.

## 1. Requirements

### Functional Requirements
*   **Post Creation**: Users can create posts (text, images, video).
*   **Feed Generation**: Users can view a feed of posts from friends/pages they follow.
*   **Interaction**: Users can like and comment on posts.
*   **Ordering**: The feed can be chronological or ranked by relevance.

### Non-Functional Requirements
*   **Latency**: Generating a feed must be fast (under 200ms).
*   **Availability**: The system needs high availability; users should always see *some* feed, even if slightly stale.
*   **Consistency**: Eventual consistency is acceptable. A post doesn't need to appear in every follower's feed instantly.

## 2. Capacity Estimation (Back-of-the-envelope)

Assume:
*   **DAU**: 300 Million
*   **Read/Write Ratio**: 100:1 (Heavy read system)
*   **Avg Post Size**: 1KB (metadata) + media storage separately.

**Traffic:**
*   Writes: 300M * 5 posts/day = 1.5 Billion posts/day. ~17k QPS.
*   Reads: 300M * 10 views/day = 3 Billion views/day. ~35k QPS.

**Storage:**
*   1.5B posts * 1KB = 1.5 TB/day.
*   5 Years = ~2.7 PB.

## 3. High Level API Design

We need two main endpoints:

\`\`\`http
POST /v1/posts
Authorization: Bearer <token>
Body: { content: "Hello World", media_ids: [...] }
\`\`\`

\`\`\`http
GET /v1/feed
Authorization: Bearer <token>
Query: { cursor: "next_page_token", limit: 20 }
\`\`\`

## 4. Database Schema

We need a relational database for metadata (MySQL/PostgreSQL) and a NoSQL store (Cassandra/DynamoDB) for the feed or activity items if scaling is extreme.

**Users Table**:
*   \`user_id\` (PK)
*   \`username\`
*   \`avatar_url\`

**Posts Table**:
*   \`post_id\` (PK)
*   \`user_id\` (FK)
*   \`content\`
*   \`created_at\`
*   \`media_urls\`

**Follows Table**:
*   \`follower_id\` (FK)
*   \`followee_id\` (FK)
*   (Composite PK on both)

## 5. System Architecture

### Feed Generation Strategies

There are two main approaches to generating the feed:

#### A. Pull Model (Fan-out on Load)
When a user loads their homepage, the system:
1.  Fetches IDs of all users they follow.
2.  Fetches the latest posts for each of those users.
3.  Merges and sorts them in memory.

*   **Pros**: Simple storage. Real-time updates.
*   **Cons**: Very slow for users following thousands of people. High compute load during reads.

#### B. Push Model (Fan-out on Write)
When a user creates a post:
1.  The system finds all their followers.
2.  It inserts the post ID into a pre-computed "Feed Cache" for each follower.
3.  When a follower reads their feed, we simply read from their cache.

*   **Pros**: extremely fast reads (O(1)).
*   **Cons**: "Justin Bieber" problem. If a celebrity has 100M followers, writing one post triggers 100M updates.

#### C. Hybrid Approach (Recommended)
*   **Normal Users**: Use Push model. Pre-compute feeds.
*   **Celebrities**: Use Pull model. Do not push their posts to all 100M queues. Instead, fetch their posts at read-time and merge them.

## 6. Detailed Design Components

### Feed Service
This service handles the \`GET /feed\` request.
1.  Check Redis Cache for the pre-computed feed.
2.  If empty, fallback to DB and rebuild cache.
3.  Hydrate post IDs with content (user info, images) concurrently.

### Fan-out Service
An async worker queue (Kafka/RabbitMQ) that processes new posts.
1.  User A posts.
2.  Service gets followers of A.
3.  Service appends \`post_id\` to the Redis list of each follower.

## 7. Scalability Improvements

*   **Sharding**: Shard the Feed Cache (Redis) by \`user_id\`.
*   **CDN**: Serve all static media (images/videos) from CDN.
*   **Caching**: Cache popular posts and user profiles in Memcached/Redis to reduce DB hits.

## 8. Summary
The Hybrid approach balances read latency and write amplification. By using a pre-computed feed for most users and merging celebrity content at read time, we ensure the system is responsive and scalable.
`;

