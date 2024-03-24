import React from 'react';

// ssr 은 아니고 isr 로 하기 .. 근데 다른api쓰지않는한 안바뀜? 22년11.30기준데이터.  ssg로 하고 url바뀌면 빌드다시하면되는거아닌가 ㅎ.
// 근데 일단 캐싱될수있어서 주의?

const Medical = () => {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-5xl">공사중입니다!</div>
    </section>
  );
};

export default Medical;
