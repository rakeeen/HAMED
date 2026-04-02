import React from 'react';
import { TimelineItem as TimelineItemType } from '../../types';
import { useLang } from '../../context/LangContext';

interface TimelineItemProps {
  key?: React.Key;
  item: TimelineItemType;
  isLast: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ item, isLast }) => {
  const { resolveField } = useLang();
  return (
    <div style={{ display: "flex", gap: "1.5rem", paddingBottom: "2rem", borderInlineStart: isLast ? "none" : "1.5px dashed var(--ink-light)", marginInlineStart: "7px", paddingInlineStart: "1.5rem", position: "relative" }}>
      <div className="timeline-dot" style={{ position: "absolute", insetInlineStart: -8, top: 4 }} />
      <div>
        <p style={{ fontFamily: "var(--font-sketch)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)" }}>{resolveField(item.role)}</p>
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.95rem", color: "var(--sepia)" }}>{resolveField(item.company)}</p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--ink-light)", margin: "0.2rem 0 0.4rem" }}>{resolveField(item.year)}</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--ink-faded)" }}>{resolveField(item.description)}</p>
      </div>
    </div>
  );
};
