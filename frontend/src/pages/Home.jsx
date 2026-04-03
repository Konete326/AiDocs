import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import documentService from '../services/documentService';

const Home = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await documentService.getDocuments();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentDoc) {
        await documentService.updateDocument(currentDoc._id, formData);
        setIsEditing(false);
        setCurrentDoc(null);
      } else {
        await documentService.createDocument(formData);
      }
      setFormData({ title: '', content: '' });
      fetchDocuments();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  const handleEdit = (doc) => {
    setIsEditing(true);
    setCurrentDoc(doc);
    setFormData({ title: doc.title, content: doc.content });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await documentService.deleteDocument(id);
        fetchDocuments();
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentDoc(null);
    setFormData({ title: '', content: '' });
  };

  return (
    <div className="home-container">
      <Navbar />
      
      <main className="main-content">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-section"
        >
          <h1>AIDocs <span className="gradient-text">CRUD</span></h1>
          <p className="subtitle">Connect your thoughts with our premium document management system.</p>
        </motion.header>

        <div className="crud-section">
          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="glass-card">
              <h2 style={{ marginBottom: '1.5rem' }}>
                {isEditing ? '✏️ Edit Document' : '✨ New Document'}
              </h2>
              <form onSubmit={handleSubmit} className="doc-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Document Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="glass-input"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="content"
                    placeholder="Describe your document..."
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    className="glass-input glass-textarea"
                    rows="6"
                    style={{ resize: 'none' }}
                  ></textarea>
                </div>
                <div className="form-actions" style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {isEditing ? 'Update Now' : 'Create Document'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={cancelEdit} className="btn btn-secondary">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* List Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="docs-list-container"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>Recent Documents</h2>
              <button 
                onClick={fetchDocuments} 
                className="action-btn" 
                title="Refresh"
                style={{ background: 'var(--accent-bg)', color: 'var(--accent)' }}
              >
                🔄
              </button>
            </div>

            {loading ? (
              <div className="loader">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ fontSize: '2rem' }}
                >
                  ⏳
                </motion.div>
                <p>Fetching your documents...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ fontSize: '3rem' }}>📁</p>
                <h3>No Documents Yet</h3>
                <p>Start by creating your first document using the form.</p>
              </div>
            ) : (
              <div className="docs-grid">
                <AnimatePresence mode="popLayout">
                  {documents.map((doc) => (
                    <motion.div 
                      key={doc._id} 
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -5 }}
                      className="glass-card doc-card"
                    >
                      <div className="doc-header">
                        <h3>{doc.title}</h3>
                        <div className="doc-actions">
                          <button 
                            className="action-btn"
                            onClick={() => handleEdit(doc)} 
                            title="Edit"
                          >
                            ✏️
                          </button>
                          <button 
                            className="action-btn"
                            onClick={() => handleDelete(doc._id)} 
                            title="Delete"
                            style={{ color: '#ef4444' }}
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="doc-preview">{doc.content}</p>
                      <div className="doc-footer">
                        <span>Created on {new Date(doc.createdAt).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <style jsx>{`
        .home-container {
          min-height: 100vh;
        }
        .main-content {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .hero-section {
          text-align: center;
          margin-bottom: 3.5rem;
        }
        .subtitle {
          font-size: 1.15rem;
          color: var(--text);
          opacity: 0.8;
          margin-top: 0.5rem;
        }
        .crud-section {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 992px) {
          .crud-section {
            grid-template-columns: 1fr;
          }
        }
        .doc-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Home;
