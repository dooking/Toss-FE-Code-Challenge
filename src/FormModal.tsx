import React from 'react';

export interface FormValues {
  name: string;
  email: string;
  experience: string;
  github: string;
}

export interface FormModalProps {
  onClose(result: FormValues | undefined): void;
}

function FormModal({ onClose }: FormModalProps) {
  const [form, setForm] = React.useState<FormValues>({
    name: '',
    email: '',
    experience: '',
    github: '',
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      className="p-6 md:p-8 space-y-6 bg-white"
      aria-labelledby="apply-form-title"
      onSubmit={(e) => {
        e.preventDefault();
        onClose(form);
      }}
    >
      <h2 id="apply-form-title" className="text-xl font-semibold tracking-tight">
        신청 폼
      </h2>

      <div className="space-y-1.5">
        <label htmlFor="name" className="block text-sm font-medium text-gray-800">
          이름/닉네임 <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="홍길동"
          aria-describedby="name-help"
          value={form.name}
          onChange={updateForm}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-medium text-gray-800">
          이메일 <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          aria-describedby="email-help"
          value={form.email}
          onChange={updateForm}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="experience" className="block text-sm font-medium text-gray-800">
          FE 경력 연차
        </label>
        <select
          id="experience"
          name="experience"
          className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          defaultValue="0-3년"
          aria-describedby="exp-help"
          value={form.experience}
          onChange={updateForm}
        >
          <option value="junior">0-3년</option>
          <option value="mid">4-7년</option>
          <option value="senior">8년 이상</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="github" className="block text-sm font-medium text-gray-800">
          Github 링크 <span className="text-gray-400">(선택)</span>
        </label>
        <input
          id="github"
          name="github"
          type="url"
          inputMode="url"
          pattern="https?://.*"
          className="block w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          placeholder="https://github.com/username"
          aria-describedby="github-help"
          value={form.github}
          onChange={updateForm}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => onClose(undefined)}
          className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700
                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          취소
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow
                 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          제출하기
        </button>
      </div>
    </form>
  );
}

export default FormModal;
