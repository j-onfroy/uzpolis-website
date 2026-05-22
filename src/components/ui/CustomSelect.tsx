import { ChevronDown, Check } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectOptionGroup {
  label: string;
  options: SelectOption[];
}

interface CustomSelectProps {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  options?: SelectOption[];
  optionGroups?: SelectOptionGroup[];
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function CustomSelect({
  value,
  onChange,
  onBlur,
  options = [],
  optionGroups,
  placeholder = 'Tanlang',
  label,
  error,
  disabled = false,
  className = '',
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    onBlur?.();
  }, [onBlur]);

  // Position dropdown relative to trigger using fixed positioning
  const openDropdown = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropH = 272;
    const above = spaceBelow < dropH + 8 && rect.top > dropH + 8;

    setDropdownStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 99999,
      ...(above
        ? { bottom: window.innerHeight - rect.top + 5 }
        : { top: rect.bottom + 5 }),
    });
    setOpen(true);
  };

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropH = 272;
    const above = spaceBelow < dropH + 8 && rect.top > dropH + 8;
    setDropdownStyle({
      position: 'fixed',
      left: rect.left,
      width: rect.width,
      zIndex: 99999,
      ...(above
        ? { bottom: window.innerHeight - rect.top + 5, top: 'auto' }
        : { top: rect.bottom + 5, bottom: 'auto' }),
    });
  }, []);

  // Close on outside click, reposition on scroll
  useEffect(() => {
    if (!open) return;
    const onMouseDown = (e: MouseEvent) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [open, close, updatePosition]);

  const allOptions = optionGroups ? optionGroups.flatMap((g) => g.options) : options;
  const selected = allOptions.find((o) => o.value === value);

  const OptionItem = ({
    option,
    isSelected,
    onClick,
  }: {
    option: SelectOption;
    isSelected: boolean;
    onClick: () => void;
  }) => (
    <div
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className="flex items-center gap-2 px-4 py-3 text-sm font-medium cursor-pointer border-b border-gray-50 transition-colors duration-100"
      style={{
        color: isSelected ? '#2563eb' : '#374151',
        background: isSelected ? '#eff6ff' : 'transparent',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = '#f8fafc';
      }}
      onMouseLeave={(e) => {
        if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = isSelected ? '#eff6ff' : 'transparent';
      }}
    >
      <span className="flex items-center justify-center flex-shrink-0" style={{ width: 16 }}>
        {isSelected && <Check size={13} color="#2563eb" strokeWidth={2.5} />}
      </span>
      <span>{option.label}</span>
    </div>
  );

  const renderOptions = () => {
    if (optionGroups) {
      return optionGroups.map((group, idx) => (
        <div key={idx}>
          <div className="px-4 py-2 text-[14px] font-bold text-blue-600 uppercase tracking-wide bg-gray-50 border-b border-gray-100 sticky top-0">
            {group.label}
          </div>
          {group.options.map((o) => (
            <OptionItem
              key={o.value}
              option={o}
              isSelected={o.value === value}
              onClick={() => { onChange(o.value); close(); }}
            />
          ))}
        </div>
      ));
    }
    return options.map((o) => (
      <OptionItem
        key={o.value}
        option={o}
        isSelected={o.value === value}
        onClick={() => { onChange(o.value); close(); }}
      />
    ));
  };

  const dropdown = open && !disabled && (
    <div
      style={{
        ...dropdownStyle,
        maxHeight: 272,
        overflowY: 'auto',
        background: '#fff',
        border: '1.5px solid #e5e7eb',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
        animation: 'uzSelectFadeIn 0.15s ease-out',
      }}
    >
      <style>{`
        @keyframes uzSelectFadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .uz-scroll::-webkit-scrollbar { width: 4px; }
        .uz-scroll::-webkit-scrollbar-track { background: #f1f5f9; }
        .uz-scroll::-webkit-scrollbar-thumb { background: #2563eb; border-radius: 99px; }
      `}</style>
      <div className="uz-scroll">
        {renderOptions()}
      </div>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-medium text-gray-500 mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger */}
      <div
        ref={triggerRef}
        onClick={() => { if (disabled) return; open ? close() : openDropdown(); }}
        className="w-full flex items-center justify-between px-3 py-2.5 text-sm border rounded-xl bg-white transition-all duration-150 outline-none select-none"
        style={{
          borderColor: error ? '#ef4444' : open ? '#2563eb' : '#e5e7eb',
          boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.08)' : undefined,
          color: selected ? '#111827' : '#9ca3af',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={15}
          strokeWidth={2}
          color={open ? '#2563eb' : '#9ca3af'}
          style={{
            flexShrink: 0,
            marginLeft: 6,
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </div>

      {/* Portal dropdown */}
      {createPortal(dropdown, document.body)}

      {/* {error && (
        <p className="mt-1 text-[14px] text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )} */}
    </div>
  );
}
