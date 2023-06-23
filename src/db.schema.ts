import { relations } from 'drizzle-orm'
import { pgTable, timestamp, varchar, uuid } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  email: varchar('email', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}))

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  userId: uuid('user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const postsRelations = relations(posts, ({ one, many }) => ({
  owner: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
}))

export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull(),
  question: varchar('question', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}))
