import React from 'react';
import 'components/atoms/ElementTextDetail/index.css';

export function ElementTextDetail({ text, className, label }) {
  return (
    <section className="elementtextdetail_container">
      <label className="elementtextdetail_label">{label}</label>
      <label className="elementtextdetail_data">{text}</label>
    </section>
  );
}
