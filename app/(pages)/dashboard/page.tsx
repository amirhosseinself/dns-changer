import DnsForm from "@/components/dashboard/DnsForm";
import DnsList from "@/components/dashboard/DnsList";

const DashboardPage = () => {
  return (
    <main className="container py-16">
      <h1 className="text-3xl font-bold mb-10 text-center">
        داشبورد مدیریت DNS
      </h1>

      <section className="mb-16">
        <DnsForm />
      </section>

      <section>
        <DnsList />
      </section>
    </main>
  );
};

export default DashboardPage;
