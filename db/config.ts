import { NOW, column, defineDb, defineTable } from 'astro:db';

// Necessary for lucia-auth
const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    discordId: column.text({ unique: true }),
    username: column.text(),
    name: column.text(),
    accentColor: column.text(),
    avatar: column.text(),
    joinedAt: column.date({ default: NOW }),
    logosClicked: column.number({ default: 0 })
  }
});

// Necessary for lucia-auth
const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    userId: column.text({
      references: () => User.columns.id
    })
  }
});

const ProgrammingLanguage = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    color: column.text(),
    icon: column.text(),
    homepage: column.text()
  }
});

const UserProgrammingLanguage = defineTable({
  columns: {
    userId: column.text({ references: () => User.columns.id }),
    programmingLanguageId: column.text({ references: () => ProgrammingLanguage.columns.id }),
    count: column.number({ default: 1 })
  },
  indexes: {
    user_programming_language_idx: {
      on: ['userId', 'programmingLanguageId'],
      unique: true
    }
  }
});

const ShowcasePostReaction = defineTable({
  columns: {
    postId: column.text(),
    userId: column.text({ references: () => User.columns.id }),
    reaction: column.text()
  },
  indexes: {
    showcase_post_reaction_idx: {
      on: ['postId', 'userId'],
      unique: true
    }
  }
});

export default defineDb({
  tables: {
    User,
    Session,
    ProgrammingLanguage,
    UserProgrammingLanguage,
    ShowcasePostReaction
  }
});
