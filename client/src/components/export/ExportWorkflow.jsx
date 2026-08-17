import { ClipboardList, Boxes, FileText, Users, Calculator, Handshake, FileCheck2, Factory, Ship, ArrowRight } from "lucide-react";

export default function ExportWorkflow() {
    const workflowSteps = [
        { icon: ClipboardList, name: "Select\nRequirement" },
        { icon: Boxes, name: "Bulk /\nPrivate Label" },
        { icon: FileText, name: "Inquiry\nForm" },
        { icon: Users, name: "Sales\nTeam" },
        { icon: Calculator, name: "Quotation" },
        { icon: Handshake, name: "Negotiation" },
        { icon: FileCheck2, name: "Purchase\nOrder" },
        { icon: Factory, name: "Export\nProcessing" },
        { icon: Ship, name: "Shipment" }
    ];

    return (
        <section className="bg-[#080b14] py-8 lg:py-12">
            <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
                <h3 className="mb-8 font-serif text-xl text-[#f8f9fa]">Export Workflow</h3>
                
                <div className="grid grid-cols-3 gap-y-8 gap-x-4 sm:grid-cols-4 md:flex md:flex-nowrap md:justify-between md:gap-0">
                    {workflowSteps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 sm:gap-4 flex-shrink-0 md:flex-row">
                            <div className="flex flex-col items-center text-center gap-3">
                                <div className="text-[#d4af37] transition hover:scale-110">
                                    <step.icon size={24} strokeWidth={1.5} />
                                </div>
                                <span className="whitespace-pre-line text-[10px] font-medium leading-tight text-[#e4e4e7]">
                                    {step.name}
                                </span>
                            </div>
                            
                            {/* Arrow divider */}
                            {idx < workflowSteps.length - 1 && (
                                <div className="text-[#d4af37]/40 mb-5 hidden md:block">
                                    <ArrowRight size={16} strokeWidth={1.5} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
