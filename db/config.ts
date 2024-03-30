import { column, defineDb, defineTable } from 'astro:db';

// Necessary for lucia-auth
const User = defineTable({
  columns: {
    id: column.text({
      primaryKey: true
    }),
    discord_id: column.text({ unique: true }),
    username: column.text(),
    avatar: column.text(),
    name: column.text(),
    accent_color: column.text(),
    logos_clicked: column.number({ default: 0 })
  }
});

// Necessary for lucia-auth
const Session = defineTable({
  columns: {
    id: column.text({
      primaryKey: true
    }),
    expiresAt: column.date(),
    userId: column.text({
      references: () => User.columns.id
    })
  }
});

const ProgrammingLanguage = defineTable({
  columns: {
    id: column.text({
      primaryKey: true
    }),
    name: column.text(),
    color: column.text(),
    icon: column.text(),
    homepage: column.text()
  }
});

const UserProgrammingLanguage = defineTable({
  columns: {
    userId: column.text({ references: () => User.columns.id }),
    programmingLanguageId: column.text({ references: () => ProgrammingLanguage.columns.id })
  },
  indexes: {
    user_programming_language_unique: {
      on: ['userId', 'programmingLanguageId'],
      unique: true
    }
  }
});

export default defineDb({
  tables: {
    User,
    Session,
    ProgrammingLanguage,
    UserProgrammingLanguage
  }
});
