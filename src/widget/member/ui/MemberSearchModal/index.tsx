import Search from '@/shared/asset/svg/Search';
import ModalWrapper from '@/shared/ui/ModalWrapper';

export default function MemberSearchModal() {
  return (
    <ModalWrapper>
      <div className="w-[350px]">
        <h2 className="mb-8 text-2xl font-bold text-[#385B97]">학생찾기</h2>
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="이름을 입력하세요"
              className="placeholder: w-full rounded-lg border-none bg-[#EFF5FF] px-4 py-3 pl-10 text-gray-600"
            />
            <div className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform">
              <Search />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
