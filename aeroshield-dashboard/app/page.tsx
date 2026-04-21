"use client";
import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Boxes, Factory, FlaskConical, Gauge, PackageCheck, ShieldAlert, Truck, Warehouse } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const scenarios = {
  base: {
    name: "Base",
    plantTargetSqftWeek: 5600,
    oee: 84.2,
    utilization: 79.4,
    serviceLevel: 97.8,
    yield: 91.6,
    otif: 95.1,
    inventoryTurns: 9.7,
    wipDays: 2.9,
    backlogUnits: 42,
    safetyIncidents: 0,
    openPOs: 27,
    incomingToday: 8,
    riskMaterials: 3,
    vessel36Cycles: 1,
    vessel60Cycles: 4,
    weeklyThroughput: [
      { week: "W1", sqft: 4920, target: 5600 },
      { week: "W2", sqft: 5210, target: 5600 },
      { week: "W3", sqft: 5470, target: 5600 },
      { week: "W4", sqft: 5660, target: 5600 },
      { week: "W5", sqft: 5515, target: 5600 },
      { week: "W6", sqft: 5830, target: 5600 },
      { week: "W7", sqft: 5725, target: 5600 },
      { week: "W8", sqft: 5940, target: 5600 },
    ],
    stageFlow: [
      { stage: "Molding", capacity: 75, actual: 69, yield: 90, wip: 14 },
      { stage: "Solvex + CPD", capacity: 72, actual: 67, yield: 98, wip: 18 },
      { stage: "Annealing", capacity: 70, actual: 64, yield: 97, wip: 22 },
      { stage: "Cutting", capacity: 80, actual: 62, yield: 96, wip: 7 },
      { stage: "Composite", capacity: 128, actual: 118, yield: 98, wip: 11 },
      { stage: "IGU", capacity: 126, actual: 120, yield: 99, wip: 8 },
    ],
    inventory: [
      { material: "Silica precursor", onHand: 1280, reorderPoint: 880, safetyStock: 310, incoming: 420, daysCover: 18, risk: "High", criticality: "A", fillRate: 98.2, spend: 148000 },
      { material: "Solvent", onHand: 2540, reorderPoint: 1600, safetyStock: 420, incoming: 900, daysCover: 21, risk: "Medium", criticality: "A", fillRate: 99.1, spend: 112000 },
      { material: "CO2 process input", onHand: 3220, reorderPoint: 1400, safetyStock: 260, incoming: 0, daysCover: 29, risk: "Low", criticality: "B", fillRate: 99.6, spend: 42000 },
      { material: "Low-e glass lite", onHand: 760, reorderPoint: 540, safetyStock: 120, incoming: 220, daysCover: 13, risk: "Medium", criticality: "A", fillRate: 97.4, spend: 174000 },
      { material: "Spacer", onHand: 1960, reorderPoint: 900, safetyStock: 180, incoming: 500, daysCover: 25, risk: "Low", criticality: "B", fillRate: 99.3, spend: 26000 },
      { material: "Adhesive / sealant", onHand: 430, reorderPoint: 380, safetyStock: 95, incoming: 80, daysCover: 11, risk: "High", criticality: "A", fillRate: 96.5, spend: 69000 },
    ],
    supplierRiskMix: [
      { name: "High", value: 2 },
      { name: "Medium", value: 2 },
      { name: "Low", value: 2 },
    ],
    serviceTrend: [
      { day: "Mon", fill: 98.4, otif: 95.8 },
      { day: "Tue", fill: 97.9, otif: 94.9 },
      { day: "Wed", fill: 99.1, otif: 96.2 },
      { day: "Thu", fill: 98.8, otif: 95.1 },
      { day: "Fri", fill: 97.2, otif: 93.7 },
      { day: "Sat", fill: 98.5, otif: 95.4 },
      { day: "Sun", fill: 99.0, otif: 96.0 },
    ],
    sourcing: [
      { supplier: "Supplier A", material: "Silica precursor", otd: 91, leadTime: 18, risk: "High", status: "Dual source needed" },
      { supplier: "Supplier D", material: "Low-e glass lite", otd: 93, leadTime: 14, risk: "Medium", status: "Monitor weekly" },
      { supplier: "Supplier F", material: "Adhesive / sealant", otd: 89, leadTime: 16, risk: "High", status: "Expedite backup PO" },
      { supplier: "Supplier B", material: "Solvent", otd: 95, leadTime: 10, risk: "Medium", status: "Stable" },
    ],
  },
  bull: {
    name: "Bull",
    plantTargetSqftWeek: 6200,
    oee: 81.1,
    utilization: 86.7,
    serviceLevel: 95.9,
    yield: 89.8,
    otif: 92.8,
    inventoryTurns: 10.8,
    wipDays: 3.4,
    backlogUnits: 77,
    safetyIncidents: 0,
    openPOs: 34,
    incomingToday: 11,
    riskMaterials: 4,
    vessel36Cycles: 1,
    vessel60Cycles: 4,
    weeklyThroughput: [
      { week: "W1", sqft: 5600, target: 6200 },
      { week: "W2", sqft: 5780, target: 6200 },
      { week: "W3", sqft: 6030, target: 6200 },
      { week: "W4", sqft: 6140, target: 6200 },
      { week: "W5", sqft: 5950, target: 6200 },
      { week: "W6", sqft: 6240, target: 6200 },
      { week: "W7", sqft: 6105, target: 6200 },
      { week: "W8", sqft: 6320, target: 6200 },
    ],
    stageFlow: [
      { stage: "Molding", capacity: 78, actual: 74, yield: 89, wip: 17 },
      { stage: "Solvex + CPD", capacity: 76, actual: 72, yield: 97, wip: 21 },
      { stage: "Annealing", capacity: 72, actual: 69, yield: 96, wip: 24 },
      { stage: "Cutting", capacity: 82, actual: 66, yield: 95, wip: 8 },
      { stage: "Composite", capacity: 136, actual: 126, yield: 97, wip: 14 },
      { stage: "IGU", capacity: 132, actual: 126, yield: 98, wip: 10 },
    ],
    inventory: [
      { material: "Silica precursor", onHand: 1320, reorderPoint: 960, safetyStock: 360, incoming: 520, daysCover: 16, risk: "High", criticality: "A", fillRate: 97.2, spend: 164000 },
      { material: "Solvent", onHand: 2490, reorderPoint: 1770, safetyStock: 460, incoming: 860, daysCover: 18, risk: "Medium", criticality: "A", fillRate: 98.2, spend: 124000 },
      { material: "CO2 process input", onHand: 3050, reorderPoint: 1550, safetyStock: 290, incoming: 300, daysCover: 25, risk: "Low", criticality: "B", fillRate: 99.1, spend: 47000 },
      { material: "Low-e glass lite", onHand: 740, reorderPoint: 620, safetyStock: 150, incoming: 260, daysCover: 11, risk: "High", criticality: "A", fillRate: 95.3, spend: 192000 },
      { material: "Spacer", onHand: 1880, reorderPoint: 980, safetyStock: 190, incoming: 600, daysCover: 22, risk: "Low", criticality: "B", fillRate: 98.7, spend: 29000 },
      { material: "Adhesive / sealant", onHand: 405, reorderPoint: 410, safetyStock: 110, incoming: 100, daysCover: 9, risk: "High", criticality: "A", fillRate: 94.8, spend: 76000 },
    ],
    supplierRiskMix: [
      { name: "High", value: 3 },
      { name: "Medium", value: 1 },
      { name: "Low", value: 2 },
    ],
    serviceTrend: [
      { day: "Mon", fill: 96.8, otif: 92.7 },
      { day: "Tue", fill: 97.1, otif: 93.4 },
      { day: "Wed", fill: 96.0, otif: 92.0 },
      { day: "Thu", fill: 97.6, otif: 94.1 },
      { day: "Fri", fill: 95.9, otif: 91.8 },
      { day: "Sat", fill: 97.4, otif: 93.6 },
      { day: "Sun", fill: 98.0, otif: 94.0 },
    ],
    sourcing: [
      { supplier: "Supplier A", material: "Silica precursor", otd: 90, leadTime: 19, risk: "High", status: "Add contingency lot" },
      { supplier: "Supplier D", material: "Low-e glass lite", otd: 91, leadTime: 15, risk: "High", status: "Reserve weekly allocation" },
      { supplier: "Supplier F", material: "Adhesive / sealant", otd: 88, leadTime: 17, risk: "High", status: "Qualify second source" },
      { supplier: "Supplier B", material: "Solvent", otd: 95, leadTime: 10, risk: "Medium", status: "Stable" },
    ],
  },
  stress: {
    name: "Stress",
    plantTargetSqftWeek: 5600,
    oee: 74.9,
    utilization: 88.1,
    serviceLevel: 91.7,
    yield: 86.2,
    otif: 88.5,
    inventoryTurns: 8.3,
    wipDays: 4.1,
    backlogUnits: 126,
    safetyIncidents: 1,
    openPOs: 38,
    incomingToday: 5,
    riskMaterials: 5,
    vessel36Cycles: 1,
    vessel60Cycles: 3,
    weeklyThroughput: [
      { week: "W1", sqft: 4380, target: 5600 },
      { week: "W2", sqft: 4610, target: 5600 },
      { week: "W3", sqft: 4895, target: 5600 },
      { week: "W4", sqft: 5120, target: 5600 },
      { week: "W5", sqft: 4760, target: 5600 },
      { week: "W6", sqft: 5230, target: 5600 },
      { week: "W7", sqft: 4990, target: 5600 },
      { week: "W8", sqft: 5310, target: 5600 },
    ],
    stageFlow: [
      { stage: "Molding", capacity: 68, actual: 60, yield: 86, wip: 22 },
      { stage: "Solvex + CPD", capacity: 65, actual: 57, yield: 95, wip: 24 },
      { stage: "Annealing", capacity: 61, actual: 54, yield: 93, wip: 28 },
      { stage: "Cutting", capacity: 76, actual: 51, yield: 92, wip: 11 },
      { stage: "Composite", capacity: 118, actual: 102, yield: 95, wip: 18 },
      { stage: "IGU", capacity: 115, actual: 99, yield: 97, wip: 15 },
    ],
    inventory: [
      { material: "Silica precursor", onHand: 980, reorderPoint: 950, safetyStock: 390, incoming: 120, daysCover: 11, risk: "High", criticality: "A", fillRate: 93.7, spend: 151000 },
      { material: "Solvent", onHand: 1840, reorderPoint: 1710, safetyStock: 500, incoming: 420, daysCover: 13, risk: "High", criticality: "A", fillRate: 94.8, spend: 116000 },
      { material: "CO2 process input", onHand: 2440, reorderPoint: 1600, safetyStock: 310, incoming: 0, daysCover: 18, risk: "Medium", criticality: "B", fillRate: 97.1, spend: 44000 },
      { material: "Low-e glass lite", onHand: 520, reorderPoint: 640, safetyStock: 170, incoming: 140, daysCover: 8, risk: "High", criticality: "A", fillRate: 89.6, spend: 186000 },
      { material: "Spacer", onHand: 1500, reorderPoint: 1040, safetyStock: 220, incoming: 200, daysCover: 16, risk: "Medium", criticality: "B", fillRate: 96.2, spend: 28000 },
      { material: "Adhesive / sealant", onHand: 310, reorderPoint: 430, safetyStock: 120, incoming: 0, daysCover: 6, risk: "High", criticality: "A", fillRate: 88.9, spend: 73000 },
    ],
    supplierRiskMix: [
      { name: "High", value: 4 },
      { name: "Medium", value: 2 },
      { name: "Low", value: 0 },
    ],
    serviceTrend: [
      { day: "Mon", fill: 91.5, otif: 88.0 },
      { day: "Tue", fill: 92.8, otif: 89.4 },
      { day: "Wed", fill: 90.7, otif: 87.2 },
      { day: "Thu", fill: 91.9, otif: 88.8 },
      { day: "Fri", fill: 89.8, otif: 86.5 },
      { day: "Sat", fill: 92.2, otif: 89.0 },
      { day: "Sun", fill: 93.4, otif: 89.9 },
    ],
    sourcing: [
      { supplier: "Supplier A", material: "Silica precursor", otd: 87, leadTime: 22, risk: "High", status: "Escalate executive review" },
      { supplier: "Supplier D", material: "Low-e glass lite", otd: 88, leadTime: 18, risk: "High", status: "Expedite and split lots" },
      { supplier: "Supplier F", material: "Adhesive / sealant", otd: 84, leadTime: 19, risk: "High", status: "Emergency backup source" },
      { supplier: "Supplier B", material: "Solvent", otd: 91, leadTime: 13, risk: "High", status: "Safety stock increase" },
    ],
  },
};

const riskColor = {
  High: "bg-rose-500/15 text-rose-300 border-rose-400/30",
  Medium: "bg-amber-500/15 text-amber-300 border-amber-400/30",
  Low: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
};

const pieColors = ["#ef4444", "#f59e0b", "#10b981"];

function kpiTone(value, good, warn) {
  if (value >= good) return "text-emerald-400";
  if (value >= warn) return "text-amber-400";
  return "text-rose-400";
}

function MetricCard({ title, value, subtitle, icon: Icon, tone = "text-slate-50" }) {
  return (
    <Card className="border-slate-800 bg-slate-900/70 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</p>
            <p className={`mt-2 text-3xl font-semibold ${tone}`}>{value}</p>
            <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3">
            <Icon className="h-5 w-5 text-cyan-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DataTable({ title, columns, rows, dense = false }) {
  return (
    <Card className="border-slate-800 bg-slate-900/70 backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-slate-100">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-y-2">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="px-3 pb-2 text-left text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="rounded-2xl bg-slate-950/70">
                  {columns.map((col) => (
                    <td key={col.key} className={`px-3 ${dense ? "py-2" : "py-3"} text-sm text-slate-200`}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AeroShieldOperationsDashboard() {
  const [scenarioKey, setScenarioKey] = useState("base");
  const [view, setView] = useState("overview");

  const data = scenarios[scenarioKey];

  const summary = useMemo(() => {
    const totalSpend = data.inventory.reduce((sum, item) => sum + item.spend, 0);
    const materialsBelowROP = data.inventory.filter((item) => item.onHand <= item.reorderPoint).length;
    const highRisk = data.inventory.filter((item) => item.risk === "High").length;
    const bottleneck = [...data.stageFlow].sort((a, b) => (a.actual / a.capacity) - (b.actual / b.capacity))[0];
    return { totalSpend, materialsBelowROP, highRisk, bottleneck };
  }, [data]);

  const inventoryColumns = [
    { key: "material", label: "Material" },
    { key: "criticality", label: "Class" },
    {
      key: "onHand",
      label: "On Hand",
      render: (v) => <span className="font-medium text-slate-100">{v.toLocaleString()}</span>,
    },
    { key: "incoming", label: "Incoming" },
    { key: "reorderPoint", label: "ROP" },
    { key: "safetyStock", label: "Safety Stock" },
    { key: "daysCover", label: "Days Cover" },
    {
      key: "fillRate",
      label: "Fill Rate",
      render: (v) => <span className={kpiTone(v, 98, 95)}>{v.toFixed(1)}%</span>,
    },
    {
      key: "risk",
      label: "Risk",
      render: (v) => <Badge className={`border ${riskColor[v]}`}>{v}</Badge>,
    },
  ];

  const sourcingColumns = [
    { key: "supplier", label: "Supplier" },
    { key: "material", label: "Material" },
    { key: "otd", label: "OTD %", render: (v) => <span className={kpiTone(v, 95, 90)}>{v}%</span> },
    { key: "leadTime", label: "Lead Time (days)" },
    { key: "risk", label: "Risk", render: (v) => <Badge className={`border ${riskColor[v]}`}>{v}</Badge> },
    { key: "status", label: "Action" },
  ];

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_48%,_#000_100%)] text-slate-100">
      <div className="mx-auto max-w-[1600px] p-6 md:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-cyan-200">
              <Factory className="h-3.5 w-3.5" /> AeroShield SCALEUP Facility
            </div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Operations Manager Dashboard</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-400 md:text-base">
              End-to-end visibility across throughput, WIP, material risk, supplier reliability, and production service for transparent aerogel and IGU operations.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Select value={scenarioKey} onValueChange={setScenarioKey}>
              <SelectTrigger className="w-[190px] border-slate-800 bg-slate-900 text-slate-100">
                <SelectValue placeholder="Scenario" />
              </SelectTrigger>
              <SelectContent className="border-slate-800 bg-slate-950 text-slate-100">
                <SelectItem value="base">Base Scenario</SelectItem>
                <SelectItem value="bull">Bull Scenario</SelectItem>
                <SelectItem value="stress">Stress Scenario</SelectItem>
              </SelectContent>
            </Select>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-1">
              <Tabs value={view} onValueChange={setView}>
                <TabsList className="bg-transparent">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="sourcing">Sourcing</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
          <MetricCard title="OEE" value={`${data.oee.toFixed(1)}%`} subtitle="Overall equipment effectiveness" icon={Gauge} tone={kpiTone(data.oee, 85, 78)} />
          <MetricCard title="Plant Utilization" value={`${data.utilization.toFixed(1)}%`} subtitle="Capacity consumed" icon={Factory} tone={kpiTone(100 - Math.abs(82 - data.utilization), 95, 85)} />
          <MetricCard title="Service Level" value={`${data.serviceLevel.toFixed(1)}%`} subtitle="Material service performance" icon={PackageCheck} tone={kpiTone(data.serviceLevel, 98, 95)} />
          <MetricCard title="Yield" value={`${data.yield.toFixed(1)}%`} subtitle="End-to-end process yield" icon={FlaskConical} tone={kpiTone(data.yield, 92, 88)} />
          <MetricCard title="WIP Days" value={data.wipDays.toFixed(1)} subtitle="Average days in process" icon={Boxes} tone={data.wipDays <= 3 ? "text-emerald-400" : data.wipDays <= 3.5 ? "text-amber-400" : "text-rose-400"} />
          <MetricCard title="Backlog" value={data.backlogUnits.toLocaleString()} subtitle="Units waiting release" icon={Truck} tone={data.backlogUnits < 60 ? "text-emerald-400" : data.backlogUnits < 100 ? "text-amber-400" : "text-rose-400"} />
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-12">
          <Card className="col-span-1 border-slate-800 bg-slate-900/70 xl:col-span-8">
            <CardHeader>
              <CardTitle className="text-slate-100">Weekly Throughput vs Target</CardTitle>
            </CardHeader>
            <CardContent className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.weeklyThroughput}>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="week" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 16 }} />
                  <Bar dataKey="sqft" radius={[10, 10, 0, 0]} fill="#22d3ee" />
                  <Bar dataKey="target" radius={[10, 10, 0, 0]} fill="#334155" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="col-span-1 grid grid-cols-1 gap-4 xl:col-span-4">
            <Card className="border-slate-800 bg-slate-900/70">
              <CardContent className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Scenario</p>
                <div className="mt-3 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{data.name}</h3>
                  <Badge className="border-cyan-400/30 bg-cyan-400/10 text-cyan-200">Target {data.plantTargetSqftWeek.toLocaleString()} sqft/week</Badge>
                </div>
                <div className="mt-5 space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm text-slate-400"><span>On-time in-full</span><span>{data.otif.toFixed(1)}%</span></div>
                    <Progress value={data.otif} className="h-2 bg-slate-800" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between text-sm text-slate-400"><span>Inventory turns</span><span>{data.inventoryTurns.toFixed(1)}x</span></div>
                    <Progress value={Math.min(data.inventoryTurns * 8, 100)} className="h-2 bg-slate-800" />
                  </div>
                  <div>
                    <div className="mb-2 flex justify-between text-sm text-slate-400"><span>High-risk materials</span><span>{data.riskMaterials}</span></div>
                    <Progress value={Math.min((data.riskMaterials / 6) * 100, 100)} className="h-2 bg-slate-800" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900/70">
              <CardContent className="grid grid-cols-2 gap-4 p-5 text-sm">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-slate-400">Open POs</p>
                  <p className="mt-2 text-2xl font-semibold">{data.openPOs}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-slate-400">Inbound Today</p>
                  <p className="mt-2 text-2xl font-semibold">{data.incomingToday}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-slate-400">36" Vessel</p>
                  <p className="mt-2 text-2xl font-semibold">{data.vessel36Cycles} cycle</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="text-slate-400">60" Vessel</p>
                  <p className="mt-2 text-2xl font-semibold">{data.vessel60Cycles} cycles</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <Card className="col-span-1 border-slate-800 bg-slate-900/70 xl:col-span-5">
            <CardHeader>
              <CardTitle className="text-slate-100">Process Stage Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.stageFlow} layout="vertical" margin={{ left: 20, right: 20 }}>
                  <CartesianGrid stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" />
                  <YAxis type="category" dataKey="stage" stroke="#94a3b8" width={110} />
                  <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 16 }} />
                  <Bar dataKey="capacity" fill="#334155" radius={[0, 8, 8, 0]} />
                  <Bar dataKey="actual" fill="#60a5fa" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-slate-800 bg-slate-900/70 xl:col-span-4">
            <CardHeader>
              <CardTitle className="text-slate-100">Service Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.serviceTrend}>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" domain={[85, 100]} />
                  <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 16 }} />
                  <Line type="monotone" dataKey="fill" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="otif" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1 border-slate-800 bg-slate-900/70 xl:col-span-3">
            <CardHeader>
              <CardTitle className="text-slate-100">Supplier Risk Mix</CardTitle>
            </CardHeader>
            <CardContent className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data.supplierRiskMix} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={4}>
                    {data.supplierRiskMix.map((entry, idx) => (
                      <Cell key={entry.name} fill={pieColors[idx % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 16 }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="col-span-1 xl:col-span-8">
            <DataTable title="Inventory Control Board" columns={inventoryColumns} rows={data.inventory} />
          </div>
          <Card className="col-span-1 border-slate-800 bg-slate-900/70 xl:col-span-4">
            <CardHeader>
              <CardTitle className="text-slate-100">Operations Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Total annual material spend</p>
                <p className="mt-2 text-3xl font-semibold text-cyan-300">${summary.totalSpend.toLocaleString()}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Materials below ROP</p>
                    <p className="mt-2 text-2xl font-semibold text-amber-300">{summary.materialsBelowROP}</p>
                  </div>
                  <ShieldAlert className="h-5 w-5 text-amber-300" />
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Highest bottleneck pressure</p>
                <p className="mt-2 text-lg font-semibold">{summary.bottleneck.stage}</p>
                <p className="mt-1 text-sm text-slate-400">Actual {summary.bottleneck.actual} vs capacity {summary.bottleneck.capacity}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Recommended action</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {scenarioKey === "stress"
                    ? "Protect low-e glass and adhesive supply first, raise safety stock on A materials, and add one temporary weekend recovery shift in annealing."
                    : scenarioKey === "bull"
                    ? "Reserve supplier capacity for low-e glass, split inbound deliveries into smaller lots, and hold a controlled WIP buffer before annealing."
                    : "Maintain current weekly cadence, qualify a backup adhesive source, and keep a daily exception review for materials approaching reorder point."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <DataTable title="Supplier Action Board" columns={sourcingColumns} rows={data.sourcing} dense />

          <Card className="border-slate-800 bg-slate-900/70">
            <CardHeader>
              <CardTitle className="text-slate-100">WIP and Yield Profile</CardTitle>
            </CardHeader>
            <CardContent className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.stageFlow}>
                  <CartesianGrid stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="stage" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: "#020617", border: "1px solid #1e293b", borderRadius: 16 }} />
                  <Area type="monotone" dataKey="wip" stackId="1" stroke="#a855f7" fill="#7c3aed" fillOpacity={0.5} />
                  <Area type="monotone" dataKey="yield" stackId="2" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.35} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 rounded-[28px] border border-slate-800 bg-slate-900/70 p-5 text-sm text-slate-400">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-slate-200">Operations manager use case</p>
              <p className="mt-1 max-w-4xl">
                This dashboard is built for daily plant control. It combines throughput, process-stage pressure, inventory exposure, and supplier action tracking in one place so the manager can decide what to expedite, what to buffer, and where the next bottleneck will hit.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Risk materials</p>
                <p className="mt-1 text-xl font-semibold text-rose-300">{summary.highRisk}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Safety incidents</p>
                <p className={`mt-1 text-xl font-semibold ${data.safetyIncidents === 0 ? "text-emerald-300" : "text-rose-300"}`}>{data.safetyIncidents}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Warehouse status</p>
                <p className="mt-1 text-xl font-semibold text-cyan-300"><Warehouse className="mr-2 inline h-4 w-4" />Live</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
