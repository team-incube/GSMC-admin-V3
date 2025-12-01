import Search from '@/shared/asset/svg/Search';
import ModalWrapper from '@/shared/ui/ModalWrapper';
import NumberButton from '@/shared/ui/NumberButton';

export default function MemberSearchModal() {
  return (
    <ModalWrapper className="box-border h-187.5 w-87.5 px-9 py-6">
      <h2 className="text-main-700 mt-3 mb-8 text-2xl font-bold">학생찾기</h2>
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="placeholder: w-full rounded-lg bg-[#EFF5FF] px-4 py-3 pl-10 font-bold text-black focus:outline-none"
          />
          <div className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform">
            <Search />
          </div>
        </div>

        <div className="mt-12">
          <p className="text-main-700 mb-3 text-lg font-bold">학년</p>
          <div className="flex gap-5">
            {[1, 2, 3].map((grade) => (
              <NumberButton key={grade} value={grade} />
            ))}
          </div>
        </div>

        <div className="mt-9">
          <p className="text-main-700 mb-3 text-lg font-bold">반</p>
          <div className="grid grid-cols-3 gap-5">
            {[1, 2, 3, 4].map((classNum) => (
              <NumberButton key={classNum} value={classNum} />
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
