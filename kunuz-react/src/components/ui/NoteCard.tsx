import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, FileText } from 'lucide-react';

interface NoteCardProps {
  id: string;
  title: string;
  darajah: number;
  subject: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ id, title, darajah, subject }) => {
  const navigate = useNavigate();

  return (
    <div className="note-card">
      <div className="note-card-header">
        <div className="note-icon-wrapper">
          <FileText size={20} className="note-icon" />
        </div>
        <div className="note-badge">Darajah {darajah}</div>
      </div>
      
      <div className="note-card-content">
        <h3 className="note-title">{title}</h3>
        <p className="note-subject">{subject}</p>
      </div>

      <div className="note-card-footer">
        <button 
          className="open-button"
          onClick={() => navigate(`/read/note/${id}`)}
        >
          <span>Open Reader</span>
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
