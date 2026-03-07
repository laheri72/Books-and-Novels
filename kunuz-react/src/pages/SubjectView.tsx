import React from 'react';
import { useParams } from 'react-router-dom';
import NoteCard from '../components/ui/NoteCard';
import notesData from '../data/notesIndex.json';
import { BookOpen } from 'lucide-react';

const SubjectView: React.FC = () => {
  const { level, subject } = useParams<{ level: string; subject: string }>();

  const darajahLevel = parseInt(level || '1');
  const subjectName = subject || '';

  const darajah = notesData.darajah.find(d => d.level === darajahLevel);
  const subjects = darajah?.subjects.find(s => s.name.toLowerCase() === subjectName.toLowerCase());
  const notes = subjects?.notes || [];

  if (!darajah || !subjects) {
    return (
      <div className="empty-state-container">
        <BookOpen size={48} />
        <h2>Subject Not Found</h2>
        <p>The subject you're looking for doesn't exist in this Darajah level.</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="breadcrumb">
          <span>{darajah.name}</span>
          <span className="separator">/</span>
          <span className="current">{subjects.name}</span>
        </div>
        <h2 className="page-title">{subjects.name} Notes</h2>
        <p className="page-description">Browse and read notes for {subjects.name} in {darajah.name}.</p>
      </header>

      {notes.length === 0 ? (
        <div className="empty-state-card">
          <p>No notes available for this subject yet.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              darajah={darajahLevel}
              subject={subjects.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectView;
