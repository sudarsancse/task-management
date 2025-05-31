import React, { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { UserContext } from "../../context/userContex";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import moment from "moment";
import InfoCard from "../../components/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../components/layouts/TaskListTable";

function Dashboard() {
  useUserAuth();

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.TASKS.GET_DASHBOARD_DATA);

      if (res.data) {
        setDashboardData(res.data);
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className=" card my-5">
        <div>
          <div className=" col-span-3 ">
            <h2 className=" text-xs md:text-2xl">
              Good Morining! {user?.name}
            </h2>
            <p className=" text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            // icon={<IoMdCard />}
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            color=" bg-primary"
          />

          <InfoCard
            // icon={<IoMdCard />}
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            color=" bg-violet-500"
          />

          <InfoCard
            // icon={<IoMdCard />}
            label=" In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            color=" bg-cyan-500"
          />

          <InfoCard
            // icon={<IoMdCard />}
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            color=" bg-lime-500"
          />
        </div>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 md:my-6">
        <div className=" md:col-span-2">
          <div className="card">
            <dic className=" flex items-center justify-between">
              <h5 className=" text-lg">Recent Task</h5>

              <button className="card-btn " onClick={onSeeMore}>
                See All <LuArrowRight className=" text-base" />
              </button>
            </dic>
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
