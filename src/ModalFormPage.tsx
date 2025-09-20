import React from 'react';

import FormModal from './FormModal';
import type { FormValues } from './FormModal';
import { useModal } from './modal/ModalProvider';

const ModalFormPage: React.FC = () => {
  const { open, close } = useModal<FormValues>();
  const [form, setForm] = React.useState<FormValues>();

  const onOpen = async () => {
    const result = await open(<FormModal onClose={close} />);
    if (result) {
      setForm(result);
    }
  };

  React.useEffect(() => {
    document.getElementById('modal-title')?.focus();
  }, []);
  return (
    <div id="modal-title" style={{ padding: 24 }} aria-labelledby="modal-title" tabIndex={-1}>
      <button
        className="px-4 py-2 rounded-md text-sm font-semibold
         bg-indigo-600 text-white shadow"
        onClick={onOpen}
      >
        신청 폼 작성하기
      </button>
      {form && (
        <div className="mt-6 p-6 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">제출 정보</h3>
          <dl className="divide-y divide-gray-100">
            <div className="flex justify-between py-2">
              <dt className="text-sm font-medium text-gray-600">Name</dt>
              <dd className="text-sm text-gray-900">{form.name}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-sm font-medium text-gray-600">Email</dt>
              <dd className="text-sm text-gray-900">{form.email}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-sm font-medium text-gray-600">Experience</dt>
              <dd className="text-sm text-gray-900">{form.experience}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-sm font-medium text-gray-600">Github</dt>
              <dd className="text-sm text-blue-600 underline">{form.github}</dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
};

export default ModalFormPage;
