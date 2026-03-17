# Tasks Feature

A comprehensive task management system for OrangeVC that allows users to create, track, and manage tasks with their assigned agents.

## Features

### ✅ Implemented

- **Task Creation**: Full-featured form with validation, file uploads, and priority settings
- **Task List**: Filterable, searchable list with pagination
- **Task Detail View**: Complete task information with status timeline
- **File Upload**: Advanced drag-and-drop file uploader with progress tracking
- **Status Tracking**: Visual timeline showing task progression through stages
- **Mock Chat**: Static chat UI for demonstration purposes
- **Subscription Guard**: Task creation restricted to subscribed users
- **Actions**: Edit and delete tasks (only for PENDING status)
- **Responsive Design**: Mobile-friendly UI across all components

### 🚧 Future Enhancements

- **Real-time Chat**: Replace mock chat with Tawk.to integration
- **Task Editing**: Full edit functionality with pre-filled forms
- **Notifications**: Real-time updates on task status changes
- **Analytics**: Task completion metrics and performance tracking

## Architecture

```
src/features/tasks/
├── types/              # TypeScript type definitions
│   ├── Task.ts        # Core task types
│   ├── api.ts         # API request/response types
│   └── ITaskRepository.ts  # Repository interface
├── lib/               # Business logic
│   ├── ApiTaskRepository.ts  # API integration
│   └── fileUpload.ts  # File upload service
├── hooks/             # React hooks
│   ├── useTasks.ts    # Task fetching hooks
│   ├── useTaskMutations.ts  # CRUD operations
│   └── useFileUpload.ts  # File upload hook
└── components/        # React components
    ├── TasksTab.tsx   # Main tasks tab
    ├── TaskList.tsx   # Task list with filters
    ├── TaskCard.tsx   # Individual task card
    ├── CreateTaskDialog.tsx  # Task creation form
    ├── TaskDetailView.tsx  # Task details
    ├── StatusTimeline.tsx  # Status progression
    ├── FileUploader.tsx  # File upload component
    ├── MockChatWindow.tsx  # Chat UI (mock)
    ├── ProfileTab.tsx  # User profile tab
    └── TawkToWidget.tsx  # Tawk.to integration
```

## API Integration

### Endpoints

All task endpoints are defined in `src/lib/api/config.ts`:

- `GET /api/v1/users/tasks/search` - List tasks with filters
- `GET /api/v1/users/tasks/:id` - Get task by ID
- `POST /api/v1/users/tasks` - Create new task
- `PATCH /api/v1/users/tasks/:id` - Update task
- `DELETE /api/v1/users/tasks/:id` - Delete task (PENDING only)
- `POST /api/v1/files/upload/tasks` - Upload file

### Authentication

All requests (except file upload viewing) require authentication via Bearer token stored in localStorage.

## Usage

### Creating a Task

```typescript
import { useCreateTask } from '@/src/features/tasks/hooks/useTaskMutations';

const { createTask, isCreating } = useCreateTask();

await createTask({
  title: 'Task title',
  description: 'Detailed description',
  priority: 'MEDIUM',
  dueDate: '2025-12-31T23:59:59.000Z',
  mediaIds: ['file-id-1', 'file-id-2'],
});
```

### Fetching Tasks

```typescript
import { useTasks } from '@/src/features/tasks/hooks/useTasks';

const { tasks, pagination, isLoading, error, updateParams } = useTasks({
  page: 1,
  limit: 10,
  status: 'IN_PROGRESS',
});
```

### File Upload

```typescript
import { useFileUpload } from '@/src/features/tasks/hooks/useFileUpload';

const { uploadFiles, fileProgresses, isUploading } = useFileUpload();

const results = await uploadFiles(selectedFiles);
const fileIds = results.map(r => r.id);
```

## Task Status Flow

1. **PENDING** → Task created, awaiting admin approval and agent assignment
2. **IN_PROGRESS** → Agent assigned and working on the task
3. **COMPLETED** → Task finished, support available for edge cases
4. **CANCELLED** → Task was cancelled

## Task Actions by Status

| Action | PENDING | IN_PROGRESS | COMPLETED | CANCELLED |
|--------|---------|-------------|-----------|-----------|
| Edit   | ✅      | ❌          | ❌        | ❌        |
| Delete | ✅      | ❌          | ❌        | ❌        |
| Chat   | ❌      | ✅          | ⚠️        | ❌        |

## File Upload

- **Max Files**: 5 per task
- **Max Size**: 10MB per file
- **Supported Types**: Images (JPEG, PNG, GIF, WebP), PDF, Word documents
- **Features**: Drag-and-drop, preview, progress tracking, validation

## Responsive Design

All components are fully responsive:

- **Mobile** (< 768px): Single column layout, stacked filters
- **Tablet** (768px - 1024px): Two-column grid where appropriate
- **Desktop** (> 1024px): Full multi-column layouts with sidebar

## Testing

Key scenarios to test:

1. ✅ Create task with and without media attachments
2. ✅ Edit task (only PENDING status)
3. ✅ Delete task (only PENDING status)
4. ✅ View task detail with all status types
5. ✅ Filter tasks by status and priority
6. ✅ Search tasks by title
7. ✅ Pagination through task list
8. ✅ Upload multiple files with progress
9. ✅ Subscription guard (create task button)
10. ✅ Responsive design on mobile/tablet/desktop

## Known Limitations

1. **Chat is Mock**: The chat window shows static sample data
2. **No Edit Dialog**: Edit functionality opens a placeholder
3. **No Real-time Updates**: Task list doesn't auto-refresh
4. **Basic Error Handling**: Some edge cases may not be covered
5. **Tawk.to Not Configured**: Environment variables need to be set

## Tawk.to Integration

To enable live chat:

1. Sign up at https://www.tawk.to/
2. Get your credentials from the dashboard
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_TAWK_PROPERTY_ID=your_property_id
   NEXT_PUBLIC_TAWK_WIDGET_ID=your_widget_id
   ```
4. Widget will automatically load on dashboard pages
5. Customize behavior in `TawkToWidget.tsx`

## Contributing

When adding new features:

1. Follow the existing architecture pattern
2. Add types to `types/` directory
3. Implement repository methods in `lib/`
4. Create reusable hooks in `hooks/`
5. Build UI components in `components/`
6. Update this README

## Support

For questions or issues:
- Check the API documentation
- Review component JSDoc comments
- Refer to existing implementations

