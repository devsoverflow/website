import { column, defineDb, defineTable } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({
      primaryKey: true
    }),
    discord_id: column.text({ unique: true }),
    username: column.text(),
    avatar: column.text(),
    name: column.text(),
    accent_color: column.text()
  }
});

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

export default defineDb({
  tables: {
    User,
    Session
  }
});
